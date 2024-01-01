INSERT INTO "public"."guild"("id","type","name","logo","description","join_button_url","moloch_address","discord_invite_url","website_url","guildname")
VALUES ('f94b7cd4-cf29-4251-baa5-eaacab98a719','SOCIAL','MetaFam','https://w3s.link/ipfs/bafybeif5k7silzqmhvg5exmcfo5tbz5ttg3kncjduzdjge5yqjfmhhnpoa/MetaFam%20icon.jpg','Redefining the way we play life.','https://wiki.metagame.wtf/docs/enter-metagame/join-metagame',NULL,'https://chat.metagame.wtf/','https://metagame.wtf/','metafam')
ON CONFLICT DO NOTHING;

insert into guild_account (guild_id, type, identifier) VALUES
('f94b7cd4-cf29-4251-baa5-eaacab98a719', 'DISCORD', '629411177947987986');
