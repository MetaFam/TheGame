#!/usr/bin/env -S node --experimental-json-modules

import { CeramicClient } from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import {
  model as basicProfileModel,
} from '@datamodels/identity-profile-basic'
import { ModelManager } from '@glazed/devtools'
import { DIDDataStore } from '@glazed/did-datastore'
import { TileLoader } from '@glazed/tile-loader'

const ethAddress = '0x615b044B6Ccb048532bcF99AAdf619d7fdD2Aa01'

const query = async () => {
  const daemon = 'http://ceramic.metagame.wtf:7007'
  const ceramic = new CeramicClient(daemon)
  const cache = new Map()
  const loader = new TileLoader({ ceramic, cache })
  const manager = new ModelManager(ceramic)
  manager.addJSONModel(basicProfileModel)

  const store = new DIDDataStore({
    ceramic,
    loader,
    model: await manager.toPublished(),
  })

  const caip10 = await Caip10Link.fromAccount(
    ceramic,
    `${ethAddress.toLowerCase()}@eip155:1`,
  );

  if (!caip10.did) {
    console.debug(`No CAIP-10 Link For ${ethAddress}`);
  } else {
    const profile = (await store.get(
      'basicProfile',
      caip10.did,
    ))
    console.info(JSON.stringify(profile, null, 2))
  }
}

query()
.then(() => process.exit(0))
.catch(err => console.error(err))
