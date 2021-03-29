ALTER TABLE public.player
  DROP CONSTRAINT "Player_enneagram_fkey"
;

ALTER TABLE public.player
  DROP COLUMN enneagram
;

DROP TABLE public."EnneagramType";
