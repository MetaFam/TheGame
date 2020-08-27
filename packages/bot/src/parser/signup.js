module.exports = function parseSignup(message) {
  
  const { content, author: { id: discordId } } = message
  
  // This discordId comes directly from the author of the message (discord.js)
  // Therefore, only two things can happen: get a valid ID or get 'undefined'.
  if (typeof discordId === 'undefined') {
    throw new Error(
      `Parsing command failed: reason: no Discord ID gathered from message, got ${discordId}`,
    )
  }
  
  if (typeof content !== 'string') {
    throw new Error(
      `Parsing command failed, reason: wrong type passed in. Expected string, got ${typeof content}`,
    )
  }
  if (content === '') {
    throw new Error(
      'Parsing command failed: reason: empty string provided as message',
    )
  }
  // Split the signup message by whitespace,
  // and remove the first two items (!ac signup flag)
  const unparsedPlatforms = content.split(' ').slice(2)
  if (unparsedPlatforms.length === 0) {
    throw new Error(
      'Parsing command failed, reason: no arguments were provided',
    )
  }

  if (unparsedPlatforms.length < 1) {
    throw new Error(
      'Parsing command failed, reason: not enough arguments. Expecting a platform alias.',
    )
  }
  
  // As we're expecting the format to be of the type
  // PLATFORM/IDENTIFIER, we now parse each string, splitting
  // by the / separator, lowercase the platform, and re-joining strings
  const parsedPlatforms = unparsedPlatforms
    .map(platformWithId => {
      const [platformName, identifier] = platformWithId.split('/')
      const lowercasedPlatformName = platformName.trim().toLowerCase()
      const sanitizedIdentifier = identifier.trim()
      return `${lowercasedPlatformName}/${sanitizedIdentifier}`
    })
    .filter(platform => !platform.includes('discord'))

  parsedPlatforms.push(`discord/${discordId}`)

  return parsedPlatforms
}
