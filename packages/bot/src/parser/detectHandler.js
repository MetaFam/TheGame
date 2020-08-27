const { RequestHandlerError } = require('../error-utils')
const handlers = require('../handlers/index')

const noop = () => undefined

module.exports = function detectHandler(message) {
  const [requestedNamespace, requestedHandler] = message.split(' ')
  // If it's not a flag, we can safely ignore this command.
  if (!requestedNamespace.includes('!')) {
    return noop()
  }
  const receivedHandler = handlers.get(requestedHandler)
  if (requestedNamespace !== '!ac') {
    throw new RequestHandlerError(
      `Could not find command with flag ${requestedNamespace}`,
    )
  }

  if (typeof receivedHandler !== 'function') {
    throw new RequestHandlerError(
      `Could not find command with flag ${requestedHandler}`,
    )
  }

  return receivedHandler
}
