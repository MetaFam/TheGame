ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS color_mask int4 NULL
;

ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS color_mask int4 NULL
;

ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_color_mask_fkey
;

ALTER TABLE public.profile
  ADD CONSTRAINT profile_color_mask_fkey
  FOREIGN KEY (color_mask)
  REFERENCES public."ColorAspect"(mask)
  ON UPDATE restrict ON DELETE restrict
;

UPDATE profile
  SET color_mask = player.color_mask
  FROM player
  WHERE profile.player_id = player.id
  AND profile.color_mask IS NULL
;

ALTER TABLE public.player
  DROP CONSTRAINT IF EXISTS player_color_mask_fkey
;

ALTER TABLE public.player
  DROP COLUMN IF EXISTS color_mask CASCADE
;
