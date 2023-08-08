ALTER TABLE "public"."token" ADD COLUMN IF NOT EXISTS  "last_offset" integer NOT NULL DEFAULT 0;
