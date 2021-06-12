CREATE TABLE "public"."guild_metadata"(
  "guild_id" uuid NOT NULL, 
  "creator_id" uuid NOT NULL,
  "discord_id" text NOT NULL,
  "discord_metadata" jsonb, 
  PRIMARY KEY ("guild_id"), 
  FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON UPDATE restrict ON DELETE restrict, 
  UNIQUE ("guild_id"),
  FOREIGN KEY ("creator_id") REFERENCES "public"."player"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."guild_metadata" IS E'Used to hold private information for guilds';

-- populate metafam
INSERT INTO guild_metadata ("guild_id", "discord_id", "creator_id") VALUES (
  (SELECT id FROM "guild" WHERE guildname = 'metafam'), 
  (SELECT discord_id FROM "guild" WHERE guildname = 'metafam'), 
  (SELECT id FROM "player" WHERE username = 'peth')
)

UPDATE guild_metadata SET discord_metadata = 
(SELECT discord_metadata FROM guild WHERE guildname = 'metafam');

ALTER TABLE "public"."guild" DROP COLUMN "discord_metadata";
