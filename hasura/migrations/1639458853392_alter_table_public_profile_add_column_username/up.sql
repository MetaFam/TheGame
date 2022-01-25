ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS username text NULL UNIQUE
;

-- A “username” field was previously added to the root player table
UPDATE profile
  SET username = player.username
  FROM player
  WHERE profile.player_id = player.id
  AND profile.username IS NULL
;
