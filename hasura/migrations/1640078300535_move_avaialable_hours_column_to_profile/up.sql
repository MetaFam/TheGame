ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS available_hours integer NULL
;

-- needed once b/c down migration partially failed
ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS available_hours integer NULL
;

UPDATE profile
  SET available_hours = player.available_hours
  FROM player
  WHERE profile.player_id = player.id
  AND profile.available_hours IS NULL
;

ALTER TABLE public.player
  DROP COLUMN IF EXISTS available_hours CASCADE
;
