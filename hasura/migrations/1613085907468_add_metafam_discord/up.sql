INSERT INTO "public"."guild"("id","type","name","logo","description","join_button_url","moloch_address","discord_invite_url","website_url","guildname")
VALUES ('f94b7cd4-cf29-4251-baa5-eaacab98a719','SOCIAL','MetaFam','https://pbs.twimg.com/profile_images/1219326469324697600/VbC_m_QR_400x400.jpg','Redefining the way we play life.','https://wiki.metagame.wtf/docs/enter-metagame/join-metagame',NULL,'https://discord.gg/fHvx7gu','https://metagame.wtf/','metafam')
ON CONFLICT DO NOTHING;

insert into guild_account (guild_id, type, identifier) VALUES
('f94b7cd4-cf29-4251-baa5-eaacab98a719', 'DISCORD', '629411177947987986');
