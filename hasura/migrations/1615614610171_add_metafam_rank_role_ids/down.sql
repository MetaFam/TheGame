UPDATE guild 
SET discord_metadata = discord_metadata - 'rankRoleIds'
WHERE guild.guildname = 'metafam';
