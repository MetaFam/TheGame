#!/usr/bin/env node

import SafeAPIKitImport from '@safe-global/api-kit'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  gnosis,
} from 'viem/chains'
import process from 'node:process'

const SafeAPIKit = SafeAPIKitImport.default

const [node, me, ...safes] = process.argv

if(safes.length === 0) {
  console.info(`
Usage: ${me.replace(/^.*\//g, '')} <Safe Address> <Safe Address>…

  Lists the token holdings of the listed Gnosis Safes in a CSV file.
`)
}

// Prefixes from: https://github.com/ethereum-lists/chains/tree/master/_data/chains
const erc3770 = {
  eth: mainnet.id,
  matic: polygon.id,
  oeth: optimism.id,
  arb1: arbitrum.id,
  gno: gnosis.id,
  base: base.id,
}

await Promise.all(safes.map(async (safe) => {
  const [chain, address] = safe.split(':')
  if(!address) {
    throw new Error(`Invalid Safe Id: ${safe}`)
  }

  const chainId = erc3770[chain]
  if(!chainId) {
    throw new Error(`Unknown ERC-3770 Prefix: ${chain}`)
  }

  console.debug({ SafeAPIKit })

  const safeAPI = new SafeAPIKit({ chainId })
  const tokens = await safeAPI.getTokenList()
  const info = await safeAPI.getSafeInfo()

  console.debug({ tokens: JSON.stringify(tokens, null, 2) })
  console.debug({ info: JSON.stringify(info, null, 2) })
}) )