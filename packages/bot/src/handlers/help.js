const helpContent = `
Available AracredBot commands:

- !ac addaddress <address> → Links your Discord account with the Ethereum address <address>. Example:

> !ac addaddress 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

- !ac help → This command.

- !ac signup <platform1/username> <platform2/username>... → Links your Discord account with platforms <platform1/username> <platform2/username>... to be able to gain cred. Supported platforms: github, discourse. NOTE: Discord will be linked to your username automatically.

> !ac signup github/foo discourse/foo

`

module.exports = function help(message) {
  message.reply(helpContent)
}
