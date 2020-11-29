CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Map"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "author_id" uuid NOT NULL, "name" text NOT NULL, "data" text, PRIMARY KEY ("id") , FOREIGN KEY ("author_id") REFERENCES "public"."Player"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
