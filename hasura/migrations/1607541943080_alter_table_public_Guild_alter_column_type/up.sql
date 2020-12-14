ALTER TABLE "public"."Guild" ALTER COLUMN "type" DROP DEFAULT;
COMMENT ON COLUMN "public"."Guild"."type" IS E'The area of focus for the guild (e.g. funding, project, etc)';
