INSERT INTO link(type, guild_id, url, name) (SELECT 'TWITTER', id, twitter_url, 'Twitter' FROM guild WHERE twitter_url is not null);
INSERT INTO link(type, guild_id, url, name) (SELECT 'DISCORD', id, discord_invite_url, 'Discord' FROM guild WHERE discord_invite_url is not null);
INSERT INTO link(type, guild_id, url, name) (SELECT 'GITHUB', id, github_url, 'GitHub' FROM guild WHERE github_url is not null);
