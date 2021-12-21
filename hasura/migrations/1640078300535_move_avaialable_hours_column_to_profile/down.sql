
ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS available_hours integer NULL
;

UPDATE player
  SET available_hours = profile.available_hours
  FROM profile
  WHERE profile.player_id = player.id
  AND player.available_hours IS NULL
;

ALTER TABLE public.profile
  DROP COLUMN available_hours
;
