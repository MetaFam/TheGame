const fetch = require('node-fetch')
const { environment } = require('../environment')
const {
  decodeData,
  encodeData,
  marshallFileUpdate,
  marshallUser,
} = require('../handler-utils')
const parseSignup = require('../parser/signup')
const { error, log } = require('../utils')

const GITHUB_API_URL = 'https://api.github.com'

module.exports = function signup(message) {
  try {
    const userId = message.author.id
    const username = message.author.username
    
    const platforms = parseSignup(message)

    fetch(`${GITHUB_API_URL}/repos/${environment('GITHUB_FILE_PATH')}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${environment('GITHUB_API_TOKEN')}`,
      },
    })
      .then(res => res.json())
      .then(body => {
        const encodedContent = body.content
        const fileSha = body.sha
        log(
          `fetched file with sha ${fileSha} for user ${username}`,
        )
        // Decode the content from the Github API response, as
        // it's returned as a base64 string.
        const decodedContent = decodeData(encodedContent) // Manipulated the decoded content:
        
        const identities = decodedContent[1].identities
        
        // First, check if the identity already exists.
        const existingIdentityIndex = identities.findIndex(
          identity =>
            identity.aliases.includes(`discord/${userId}`),
        )

        if (existingIdentityIndex !== -1) {
          // Add new identities to existing user
          const existingIdentity = identities[existingIdentityIndex]
          const existingPlatforms = existingIdentity.aliases.map(p => {
            const [platformName, identifier] = p.split('/')
            return { platformName, identifier }
          })
          
          // Filter out any platforms the user already has to prevent duplicate
          // entries or registering multiple identities for the same platform
          const platformsToAdd = platforms.filter(p => {
            const [platformName] = p.split('/')
            
            return !existingPlatforms.find(p => p.platformName === platformName)
          })
  
          // Terminate if there's no new platforms to add
          if (!platformsToAdd.length) {
            message.reply('You have already linked all these accounts.')
            log(
              `Detected user ${username}(${userId}) already has all accounts linked`,
            )
            return
          }
  
          decodedContent[1].identities[existingIdentityIndex].aliases.push(...platformsToAdd)
        } else {
          // If the user is not registered, we can now proceed to mutate
          // the file by appending the user to the end of the array.
          const userIdentity = marshallUser({ username, platforms })
          decodedContent[1].identities.push(userIdentity)
        }
       
        // We encode the updated content to base64.
        const updatedContent = encodeData(decodedContent)
        // We prepare the body to be sent to the API.
        const marshalledBody = marshallFileUpdate({
          message: 'Update project.json',
          content: updatedContent,
          sha: fileSha,
        })
        // And we update the project.json file directly.
        fetch(`${GITHUB_API_URL}/repos/${environment('GITHUB_FILE_PATH')}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${environment('GITHUB_API_TOKEN')}`,
          },
          body: marshalledBody,
        }).then(() => {
          log('Updated file on GitHub successfully.')
          message.reply('Update was successful!')
        })
      })
      .catch(err => {
        error(err)
        message.reply(
          'Something went wrong while executing the command. Please try again in a few minutes.',
        )
      })
  } catch (err) {
    log(err)
    message.reply(
      'Command parsing failed. Please use the !ac help command to see how to use the requested command properly.',
    )
  }
}
