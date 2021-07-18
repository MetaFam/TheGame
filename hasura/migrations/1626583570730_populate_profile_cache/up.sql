-- The profile cache relies on there being an entry for every player
-- (when checking for expired profiles, only the cache table is queried).
-- A trigger will add entries for new players as they are added, this
-- creates the entries for the existing players.
INSERT INTO profile_cache (player_id, last_checked_at)
  SELECT id, NULL FROM player
;
