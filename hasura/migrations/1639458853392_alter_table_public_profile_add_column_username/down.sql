UPDATE player
  SET username = profile.username
  FROM profile
  WHERE profile.player_id = player.id
  AND player.username IS NULL
;

ALTER TABLE public.profile
  DROP COLUMN username
;
