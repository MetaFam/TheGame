ALTER TABLE "public"."Guild" ADD COLUMN "identifier" text;
ALTER TABLE "public"."Guild" ALTER COLUMN "identifier" DROP NOT NULL;
