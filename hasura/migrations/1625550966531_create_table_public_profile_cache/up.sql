CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."profile_cache"(
  "name" text,
  "description" text,
  "location" text,
  "emoji" text,
  "imageUrl" text,
  "backgroundImageUrl" text,
  "website" text,
  "gender" text,
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  PRIMARY KEY ("id"),
  UNIQUE ("id")
);
