const { EnvironmentError } = require('./error-utils')

// Structure:
// [environmentVariable, default, required?]
const ENV_VARS = {
  DISCORD_API_TOKEN: [
    process.env.DISCORD_API_TOKEN,
    'YOUR_DISCORD_API_TOKEN',
    true,
  ],
  GITHUB_API_TOKEN: [
    process.env.GITHUB_API_TOKEN,
    'YOUR_GITHUB_API_TOKEN',
    true,
  ],
  GITHUB_FILE_PATH: [
    process.env.GITHUB_FILE_PATH,
    '<username>/<repo>/contents/<path_to_project.json>/project.json',
    true,
  ],
  GITHUB_ADDRESS_FILE_PATH: [
    process.env.GITHUB_ADDRESS_FILE_PATH,
    '<username>/<repo>/contents/<path_to_addressbook.json>/addressbook.json',
    true,
  ],
  SENTRY_DSN: [process.env.SENTRY_DSN, '', false],
  WHITELISTED_CHANNELS: [process.env.WHITELISTED_CHANNELS, '*', false],
}

function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  // If the environment variable is required and has not been properly set,
  // throw an error.
  if (envVar === ENV_VARS[name][1] && ENV_VARS[name][2]) {
    throw new EnvironmentError(
      `The environment variable with name ${name} has not been set properly. Please edit it on the heroku config vars.`,
    )
  }

  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}

function fullEnvironment() {}

module.exports = { environment, fullEnvironment }
