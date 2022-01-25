#!/usr/bin/env -S node --experimental-json-modules

import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { constants } from 'fs'
import JSON5 from 'json5'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { access, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'path'
import { fromString } from 'uint8arrays'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

;(async () => {
  let raw = process.env.DID_KEY
  if(!raw) {
    try {
      const keyFile = `${__dirname}/../private.key`
      await access(keyFile, constants.R_OK)
      raw = (await readFile(keyFile, 'utf8')).trim()
    } catch {}
  }
  if(!raw) {
    console.warn('$DID_KEY must be set or `private.key` must exist.')
    console.warn('Generate it with `openssl rand -hex 32 > private.key`.')
    process.exit(-2)
  }

  const key = fromString(raw, 'base16')
  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
  })
  await did.authenticate()

  const ceramicURL = (
    process.env.CERAMIC_URL
    || 'https://ceramic.metagame.wtf'
    || 'http://localhost:7007'
  )
  console.debug(`Connecting to ${ceramicURL}`)
  const ceramic = new CeramicClient(ceramicURL)
  ceramic.did = did

  const manager = new ModelManager(ceramic)

  const schemaFile = `${__dirname}/../schema/extended-profile.json5`
  const schema = JSON5.parse(
    await readFile(schemaFile, 'utf8')
  )

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
 
  const model = await manager.toJSON()
  const out = `${__dirname}/../src/ExtendedProfileModel.json`
  await writeFile(out, JSON.stringify(model, null, 2))

  console.debug(`Wrote ids to "${out}".`)
})()
