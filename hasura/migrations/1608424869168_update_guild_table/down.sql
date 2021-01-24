
ALTER TABLE "public"."Guild" DROP COLUMN "website_url";

ALTER TABLE "public"."Guild" DROP COLUMN "discord_invite_url";

ALTER TABLE "public"."Guild" DROP COLUMN "moloch_address";

ALTER TABLE "public"."Guild" DROP COLUMN "join_button_url";

ALTER TABLE "public"."Guild" ADD COLUMN "identifier" text;
ALTER TABLE "public"."Guild" ALTER COLUMN "identifier" DROP NOT NULL;

COMMENT ON COLUMN "public"."Guild"."type" IS E'';
