insert into guild_account (guild_id, type, identifier) VALUES
('f94b7cd4-cf29-4251-baa5-eaacab98a719', 'DISCORD', '629411177947987986');

UPDATE guild 
SET discord_id = NULL
WHERE id = 'f94b7cd4-cf29-4251-baa5-eaacab98a719';
