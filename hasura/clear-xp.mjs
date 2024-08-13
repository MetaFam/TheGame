#!/usr/bin/env node

/* eslint-disable no-console */

const TARGET_GRAPHQL_URL = (
  process.env.TARGET_GRAPHQL_URL || 'http://localhost:8080/v1/graphql'
)
const HASURA_ADMIN_SECRET = (
  process.env.HASURA_ADMIN_SECRET || 'metagame_secret'
)

const headers = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
}

async function fetchGraphQL({
  url = TARGET_GRAPHQL_URL, opDoc, opName = null, variables = {}
}) {
  const regex = /^\s*(query|mutation)\s+(\S+)\s*\{.*/s
  opName ??= opDoc.replace(regex, '$2')
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query: opDoc,
      variables,
      operationName: opName,
    }),
    headers,
  })

  const body = await result.text()
  try {
    return JSON.parse(body)
  } catch(err) {
    console.error(`JSON Error: ${err.message}`)
    console.error(body)
    throw err
  }
}

const clearBalancesMutation = /* GraphQL */`
  mutation ClearBalances {
    delete_balance(where: {}) {
      affected_rows
    }
  }
`.trim()

async function clearBalances() {
  const { data } = await fetchGraphQL({
    opDoc: clearBalancesMutation,
  })
  return data.delete_balance.affected_rows
}

const resetOffsetsMutation = /* GraphQL */`
  mutation ResetOffsets {
    update_token(where: {}, _set: { lastBlockHeight: 42746520 }) {
      affected_rows
    }
  }
`.trim()

async function resetOffsets() {
  const { data, errors } = await fetchGraphQL({
    opDoc: resetOffsetsMutation,
  })
  if(!!errors) throw errors[0]
  return data.update_token.affected_rows
}

console.info(`Resetting the XP system for all guilds on ${TARGET_GRAPHQL_URL}…`)

const numReset = await resetOffsets()
console.debug(`Reset ${numReset} guilds.`)

const numCleared = await clearBalances()
console.debug(`Removed ${numCleared} balances.`)
