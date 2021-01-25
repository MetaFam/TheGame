
ALTER TABLE "public"."Guild" ALTER COLUMN "guildname" DROP NOT NULL;
COMMENT ON COLUMN "public"."Guild"."guildname" IS E'';

ALTER TABLE "public"."Guild" DROP COLUMN "guildname";
