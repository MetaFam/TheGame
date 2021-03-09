
ALTER TABLE "public"."player" ADD COLUMN "discord_id" text NULL UNIQUE;

ALTER TABLE "public"."guild" ADD COLUMN "discord_id" text NULL UNIQUE;

UPDATE player p
SET discord_id = pa.identifier
FROM player_account pa 
WHERE pa.player_id = p.id AND pa.type = 'DISCORD';

DELETE FROM player_account WHERE type = 'DISCORD';
