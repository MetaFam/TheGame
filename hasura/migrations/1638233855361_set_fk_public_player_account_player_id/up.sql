ALTER TABLE public.player_account
  DROP CONSTRAINT player_account_player_id_fkey,
  ADD CONSTRAINT player_account_player_id_fkey
  FOREIGN KEY (player_id)
  REFERENCES public.player(id)
  ON UPDATE NO ACTION ON DELETE NO ACTION
;
