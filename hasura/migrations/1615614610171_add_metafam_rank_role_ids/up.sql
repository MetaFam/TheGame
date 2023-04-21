UPDATE guild 
SET discord_metadata = jsonb_set(
  discord_metadata,
  '{rankRoleIds}',
  '{"DIAMOND": "659518696506785802", "PLATINUM": "659519668553252864", "GOLD": "659519940159602746", "SILVER": "665574957094535199", "BRONZE": "675569758682480661"}'
)
WHERE guild.guildname = 'metafam';

UPDATE guild
SET discord_metadata = jsonb_set(
  discord_metadata,
  '{membershipRoleIds}',
  '["681296328956968983", "771329952691650600"]'
)
WHERE guild.guildname = 'metafam';
