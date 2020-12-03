CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Map"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "author_address" text NOT NULL, "name" Text NOT NULL, "data" Text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
