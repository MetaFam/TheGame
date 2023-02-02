# MetaGame’s Discord Bot

## Setup

1. Copy `.env.sample` to `.env`
2. Visit [Discord's Developer Portal](//discord.com/developers/applications/) and register a new application.
3. The `DISCORD_BOT_CLIENT_ID` is available on the “General Information” tab.
4. In the “Bot” pane, create a bot user.
5. Give the bot user the “Server Members” intent.
6. From the created user, get the `DISCORD_BOT_TOKEN`.
7. From the OAuth2 tab, get the `DISCORD_BOT_CLIENT_SECRET`.
8. From [GitHub’s Apps](//github.com/settings/apps) generate a personal access token for `GITHUB_API_TOKEN`.

## Development

Run `yarn dev`.

## Docker Commands

To build: from the repository root: `docker build -f docker/discord-bot/Dockerfile -t discord-bot .`

To run: `docker run discord-bot`
