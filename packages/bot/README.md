![Aracred](https://github.com/aracred/bot/workflows/CI/badge.svg)

# bot

:robot: Aracred Bot to quickly onboard users into an Aracred instance. Don't be afraid to fork and modify this!

## Quickstart

<a href="https://heroku.com/deploy?template=https://github.com/aracred/bot">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

^^ Click here to deploy!

## Quick end-user guide 🦅

Interacting with the bot is simple; it offers 3 commands, all of them starting with the !ac flag:

- "!ac help": Shows the available commands, along with an example for each one.

- "!ac signup": Signs the user up for generating cred through their contributions, by modifying the `project.json` file in the configured Aracred repo.

- "!ac addaddress": Signs the user up for receiving tokens minted to match their generated cred, by modifying the `addressbook.json` file in the configured Aracred repo.

## Developer quick start 👩‍💻

`npm run dev` will launch the bot locally, with hot reloading included.

There are a few other scripts provided:

- `start`: Starts up the bot without hot reloading; used for the heroku deployment described below.
- `lint`: Lints the project with ESLint.
- `test`: Runs all the tests! (If you contribute some code, please do write tests for it ⌨️!)

### Configuration

For the bot to run properly, it needs these variables, laid out in the `.env.sample` file:

- `DISCORD_API_TOKEN`: Your discord API token. [See this guide on how to obtain one](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).
- `GITHUB_API_TOKEN`: Your github API token. _This will tie the bot's contributions to your profile_.
- `GITHUB_FILE_PATH`: The "file path" to the `project.json` folder, laid out with the format described [here](https://developer.github.com/v3/repos/contents/#create-or-update-a-file).
- `GITHUB_ADDRESS_FILE_PATH`: The "file path" to the `addressbook.json` folder, laid out with the format described [here](https://developer.github.com/v3/repos/contents/#create-or-update-a-file).
- `WHITELISTED_CHANNELS`: The whitelisted channels for the bot to read messages from, in the form of comma separated words, as in `bot,general,channel`. If you want the bot to listen to all channels, set this variable to `*`.

### Deployment

You'll need a service to host this bot 💆‍♀️ but do not despair! There's an easy, already configured way of doing this by deploying it to heroku! Just go through these steps:

- Create a new Heroku app and link it to GitHub
- Search for the repo and connect it
- Enable "automatic deploys" for the app
- BONUS: If you want to be able to run this bot 24/7, you can add link your billing info to Heroku, and will give you a 1000 hours for free, enough for a bot instance.

### Contributing

Don't be shy to contribute even the smallest tweak. 🐲 There are still some dragons to be aware of, but we'll be here to help you get started!
