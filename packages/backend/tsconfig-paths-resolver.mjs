import { existsSync } from 'node:fs'

import tsConfig from './tsconfig.json' assert { type: 'json' }

const isTS = process.argv.includes('ts-node')
const ext = `.${isTS ? 't' : 'j'}s`
const basePath = `${isTS ? 'src' : 'dist'}/`

const { paths } = tsConfig.compilerOptions
const matches = Object.fromEntries(
  Object.entries(paths).map(([exp, comps]) => ([
    `^${exp.replace(/\*/g, '(.*)')}$`, comps
  ]))
)


export const resolve = async (specifier, context, nextResolve) => {
  const { parentURL = null } = context;
  const [match, comps] = Object.entries(matches).find(
    ([m]) => (new RegExp(m)).test(specifier)
  ) ?? []
  if (comps && match && parentURL) {
    const [, rest] = specifier.match(new RegExp(match))
    try {
      comps.forEach((comp) => {
        let rel = `${basePath}${comp.replace(/\*/g, rest)}`
        if (!/\.(t|j)s$/.test(rel)) rel += ext
        const test = new URL(rel, import.meta.url)
        if (existsSync(test.pathname)) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw test
        }
      })
      console.error(`Couldn't Resolve: ${specifier}`)
    } catch (thrown) {
      return {
        shortCircuit: true,
        url: thrown.href,
      }
    }
  }

  // Defer to the next hook in the chain, which would be the
  // Node.js default resolve if this is the last user-specified loader.
  return nextResolve(specifier)
}
