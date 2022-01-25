ALTER TABLE public.player
  ADD COLUMN IF NOT EXISTS color_mask int4 NULL
;

ALTER TABLE public.player
  ADD CONSTRAINT player_color_mask_fkey
  FOREIGN KEY (color_mask) REFERENCES public."ColorAspect"(mask)
  ON DELETE restrict ON UPDATE restrict
;

UPDATE player
  SET color_mask = profile.color_mask
  FROM profile
  WHERE profile.player_id = player.id
  AND player.color_mask IS NULL
;

ALTER TABLE public.profile
  DROP CONSTRAINT profile_color_mask_fkey
;

ALTER TABLE public.profile
  DROP COLUMN IF EXISTS color_mask
;
