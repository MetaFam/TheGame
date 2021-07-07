CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.profile_cache (
  name TEXT,
  description TEXT,
  location TEXT,
  emoji TEXT,
  "imageUrl" TEXT,
  "backgroundImageUrl" TEXT,
  website TEXT,
  gender TEXT,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  PRIMARY KEY (id),
  UNIQUE (id)
);
