
ALTER TABLE "public"."Guild" ADD COLUMN "guildname" text NULL UNIQUE;

ALTER TABLE "public"."Guild" ALTER COLUMN "guildname" SET NOT NULL;
COMMENT ON COLUMN "public"."Guild"."guildname" IS E'Unique friendly identifier for the Guild (used in URL)';
