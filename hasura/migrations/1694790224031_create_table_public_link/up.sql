CREATE TABLE "public"."link" (
  "name" text, "url" text,
  "type" text,
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "player_id" uuid,
  "guild_id" uuid,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("player_id") REFERENCES "public"."player"("id")
    ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id")
    ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("id")
);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
