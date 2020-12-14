ALTER TABLE ONLY "public"."Guild" ALTER COLUMN "type" SET DEFAULT ''The area of focus for the guild (e.g. funding, project, etc)'::text';
COMMENT ON COLUMN "public"."Guild"."type" IS E'';
