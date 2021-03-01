
ALTER TABLE public.player
  DROP CONSTRAINT player_color_mask_fkey
;

ALTER TABLE public.player
  DROP COLUMN color_mask
;

DROP TABLE public."BaseColor";
DROP TABLE public."ColorAspect";
