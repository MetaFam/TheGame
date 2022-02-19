ALTER TABLE "public"."guild" ADD COLUMN "moloch_address" text;
ALTER TABLE "public"."guild" ALTER COLUMN "moloch_address" DROP NOT NULL;
