
ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS timezone integer NULL
;

UPDATE player
  SET timezone = profile.time_zone
  FROM profile
  WHERE profile.player_id = player.id
  AND player.timezone IS NULL
;

ALTER TABLE public.profile
  DROP COLUMN IF EXISTS time_zone
;
