ALTER TABLE "public"."player" ADD COLUMN "timezone" int4;
ALTER TABLE "public"."player" ALTER COLUMN "timezone" DROP NOT NULL;
