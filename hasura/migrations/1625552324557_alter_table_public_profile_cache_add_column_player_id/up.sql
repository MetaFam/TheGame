ALTER TABLE "public"."profile_cache"
  ADD COLUMN "player_id" uuid NOT NULL UNIQUE
;
