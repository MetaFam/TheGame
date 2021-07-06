ALTER TABLE "public"."profile_cache"
  ADD CONSTRAINT "profile_cache_player_id_fkey"
  FOREIGN KEY ("player_id")
  REFERENCES "public"."player"("id")
  ON UPDATE CASCADE ON DELETE CASCADE
;
