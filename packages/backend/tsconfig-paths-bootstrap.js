/* 
This is a custom configuration for tsconfig-paths to be able to "fix" 
relative paths at runtime (in node.js) in the Docker container.  tsconfig-paths 
"just works" for local dev, but this extra configuration is necessary when 
running in Docker since at that point we're just running the transpiled 
javascript in the dist directory.
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: 'dist',
  paths: {},
});
