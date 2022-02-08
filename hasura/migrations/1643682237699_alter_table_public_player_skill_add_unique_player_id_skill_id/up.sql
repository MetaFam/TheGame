ALTER TABLE public.player_skill
  ADD CONSTRAINT player_skill_player_id_skill_id_key
  UNIQUE (player_id, skill_id)
;
