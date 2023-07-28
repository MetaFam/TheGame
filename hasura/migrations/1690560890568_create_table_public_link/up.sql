CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."link"("player_id" uuid NOT NULL, "url" text NOT NULL, "name" text, "type" text, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));
