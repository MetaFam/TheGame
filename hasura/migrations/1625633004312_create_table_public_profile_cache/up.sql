
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.profile_cache (
  name TEXT,
  description TEXT,
  location TEXT,
  emoji TEXT,
  image_url TEXT,
  background_image_url TEXT,
  website TEXT,
  gender TEXT,
  player_id uuid NOT NULL UNIQUE,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  PRIMARY KEY (id),
  UNIQUE (id)
);

ALTER TABLE public.profile_cache
  ADD CONSTRAINT profile_cache_player_id_fkey
  FOREIGN KEY (player_id)
  REFERENCES public.player(id)
  ON UPDATE CASCADE ON DELETE CASCADE
;
