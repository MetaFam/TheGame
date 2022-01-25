ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS pronouns text NULL
;

-- A “pronouns” field was previously added to the root player table
UPDATE profile
  SET pronouns = player.pronouns
  FROM player
  WHERE profile.player_id = player.id
  AND profile.pronouns IS NULL
;
