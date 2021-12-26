CREATE UNIQUE INDEX username_insensitive_unique_idx
  ON profile(LOWER(username))
;
