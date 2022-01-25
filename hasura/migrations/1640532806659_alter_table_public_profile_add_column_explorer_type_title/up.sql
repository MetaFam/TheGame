ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS explorer_type_title text NULL
;

UPDATE profile
  SET explorer_type_title = "ExplorerType".title
  FROM player, "ExplorerType"
  WHERE profile.player_id = player.id
  AND player.player_type_id = "ExplorerType".id
  AND profile.explorer_type_title IS NULL
;
