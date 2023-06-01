#!/usr/bin/env -S node --experimental-json-modules

import { CeramicClient } from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import {
  model as cryptoAccountsModel
} from '@datamodels/identity-accounts-crypto'
import {
  model as basicProfileModel
} from '@datamodels/identity-profile-basic'
import { ModelManager } from '@glazed/devtools'
import { DIDDataStore } from '@glazed/did-datastore'
import crypto from 'crypto'
import { DID } from 'dids'
import { constants } from 'fs'
import { access, readFile } from 'fs/promises'
import JSON5 from 'json5'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { dirname, join } from 'path'
import { fromString } from 'uint8arrays'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let ethAddress = '0x615b044B6Ccb048532bcF99AAdf619d7fdD2Aa01'
ethAddress = '0xC33290860C1DA6a84195C5cf1575860d3A3ED73d'

const daemon = 'https://ceramic.metagame.wtf'
const ceramic = new CeramicClient(daemon)

console.info(`Connecting to: ${daemon}`)

const main = async () => {
  const schemaFile = join(__dirname, '../schema/extended-profile.json5')

  console.debug(`Loading schema from: ${schemaFile}`)

  const schema = JSON5.parse(
    await readFile(schemaFile, 'utf8')
  )
  const did = await setup(ethAddress)
  if (!did) {
    console.debug(`No CAIP-10 Link For ${ethAddress}`);
  } else {
    console.debug(`DID: ${did}`)

    const model = await create(schema)
    const store = await storeFor(
      [basicProfileModel, model, cryptoAccountsModel]
    )
    await profiles(store, did)
    // await write(store)
    await profiles(store, undefined)
    await cryptos(store, did)
  }
  console.debug('Completing…')
}

const setup = async (address) => {
  let key = null
  let raw = process.env.DID_KEY
  if (raw) {
    console.debug('Reading private key from $DID_KEY.')
  } else {
    try {
      const keyFile = join(__dirname, '../private.key')
      await access(keyFile, constants.R_OK)
      raw = (await readFile(keyFile, 'utf8')).trim()
      console.debug(`Reading private key from ${keyFile}.`)
    } catch { }

    if (raw) {
      key = fromString(raw, 'base16')
    }
  }

  if (!key) {
    key = crypto.randomBytes(32);
    console.debug(`Generated key: ${key.toString('hex')}`)
  }
  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
  })
  await did.authenticate()
  ceramic.did = did

  console.debug(`Retrieving DID for: ${address}`)

  const caip10 = await Caip10Link.fromAccount(
    ceramic,
    `${address}@eip155:1`,
  );

  console.debug('Got:', caip10)

  return caip10.did
}

const create = async (schema) => {
  const manager = new ModelManager(ceramic)
  const schemaId = await manager.createSchema(
    'ExtendedProfile', schema,
  )
  const schemaURI = manager.getSchemaURL(schemaId)
  console.debug(`Wrote schema to "${schemaURI}".`)

  await manager.createDefinition(
    'extendedProfile',
    {
      name: 'Extended profile information',
      description: 'Profile fields in addition to those found in Ceramic’s `basicProfile`.',
      schema: schemaURI,
    }
  )

  return manager.toJSON()
}

const storeFor = async (models) => {
  const manager = new ModelManager(ceramic)

  models.forEach((model) => {
    manager.addJSONModel(model)
  })

  return new DIDDataStore({
    ceramic,
    model: await manager.toPublished(),
  })
}

const profiles = async (store, did) => {
  const basic = (await store.get('basicProfile', did))
  console.info(`basic(${did})`, JSON5.stringify(basic, null, 2))

  const extended = (await store.get('extendedProfile', did))
  console.info(`extended(${did})`, JSON5.stringify(extended, null, 2))
}

const cryptos = async (store, did) => {
  const accounts = (await store.get('cryptoAccounts', did))
  console.info(`accounts(${did})`, JSON5.stringify(accounts, null, 2))
}

const write = async (store) => {
  const basic = { gender: 'fluid' }
  const basicRes = await store.merge('basicProfile', basic);
  console.info(`Wrote basicProfile to: ${basicRes.toUrl()}`)

  const extended = { pronouns: 'many & varied' }
  const extendedRes = await store.merge('extendedProfile', extended);
  console.info(`Wrote extendedProfile to: ${extendedRes.toUrl()}`)
}

main()
.then(() => process.exit(0))
.catch(err => console.error(err))
