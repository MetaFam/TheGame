
COMMENT ON COLUMN "public"."Guild"."type" IS E'The area of focus for the guild (e.g. funding, project, etc)';

ALTER TABLE "public"."Guild" DROP COLUMN "identifier" CASCADE;


ALTER TABLE "public"."Guild" ADD COLUMN "join_button_url" text NULL;

ALTER TABLE "public"."Guild" ADD COLUMN "moloch_address" text NULL;

ALTER TABLE "public"."Guild" ADD COLUMN "discord_invite_url" text NULL;

ALTER TABLE "public"."Guild" ADD COLUMN "website_url" text NULL;
