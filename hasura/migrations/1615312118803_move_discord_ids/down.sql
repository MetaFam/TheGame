
INSERT INTO player_account (player_id, type, identifier)
SELECT id, 'DISCORD', discord_id FROM player WHERE discord_id IS NOT NULL;

UPDATE player SET discord_id = NULL;

ALTER TABLE "public"."guild" DROP COLUMN "discord_id";

ALTER TABLE "public"."player" DROP COLUMN "discord_id";
