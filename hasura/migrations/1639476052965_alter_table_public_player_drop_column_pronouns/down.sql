ALTER TABLE "public"."player" ADD COLUMN "pronouns" text;
ALTER TABLE "public"."player" ALTER COLUMN "pronouns" DROP NOT NULL;
