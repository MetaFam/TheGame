import tsConfigPaths from 'tsconfig-paths'

import tsConfig from './tsconfig.json' assert { type: 'json' }

console.debug(JSON.stringify(tsConfig.compilerOptions.paths, null, 2))

const baseUrl = './dist'
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
})

// When path registration is no longer needed
cleanup()
