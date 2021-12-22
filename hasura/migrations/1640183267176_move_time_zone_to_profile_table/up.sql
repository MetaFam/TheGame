
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS time_zone text NULL
;

ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS timezone integer NULL
;

UPDATE profile
  SET time_zone = player.timezone
  FROM player
  WHERE profile.player_id = player.id
  AND profile.time_zone IS NULL
;

ALTER TABLE public.player
  DROP COLUMN IF EXISTS timezone CASCADE
;
