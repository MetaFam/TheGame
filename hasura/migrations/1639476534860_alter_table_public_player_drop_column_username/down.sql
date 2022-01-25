ALTER TABLE "public"."player" ADD COLUMN "username" text;
ALTER TABLE "public"."player" ALTER COLUMN "username" DROP NOT NULL;
ALTER TABLE "public"."player" ADD CONSTRAINT Player_username_unique_key UNIQUE (username);
