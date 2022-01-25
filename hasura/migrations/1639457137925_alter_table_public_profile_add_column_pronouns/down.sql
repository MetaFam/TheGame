ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS pronouns text NULL
;

UPDATE player
  SET pronouns = profile.pronouns
  FROM profile
  WHERE profile.player_id = player.id
  AND player.pronouns IS NULL
;

ALTER TABLE public.profile
  DROP COLUMN pronouns
;
