const { validateAddress } = require('../web3-utils')

module.exports = function parseAddAddress(message) {
  if (typeof message !== 'string') {
    throw new Error(
      `Parsing command failed, reason: wrong type passed in. Expected string, got ${typeof message}`,
    )
  }

  if (message === '') {
    throw new Error(
      'Parsing command failed, reason: empty string provided as message',
    )
  }
  // Split the signup message by whitespace,
  // and remove the two items (!ac addaddress)
  const splitMessage = message.split(' ').slice(2)

  if (splitMessage.length < 1) {
    throw new Error(
      'Parsing command failed, reason: too few arguments were provided',
    )
  }

  if (splitMessage.length > 1) {
    throw new Error(
      'Parsing command failed, reason: too many arguments provided',
    )
  }

  const address = splitMessage[0]

  if (!validateAddress(address)) {
    throw new Error(
      'Parsing command failed, reason: ethereum address is not valid.',
    )
  }

  return address
}
