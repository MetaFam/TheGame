ALTER TABLE "public"."balance" ADD COLUMN "block_height" int4;
ALTER TABLE "public"."balance" ALTER COLUMN "block_height" DROP NOT NULL;
