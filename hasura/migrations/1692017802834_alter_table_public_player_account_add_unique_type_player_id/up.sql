ALTER TABLE public.player_account
  DROP CONSTRAINT "Account_identifier_type_key"
;

ALTER TABLE public.player_account
  DROP CONSTRAINT IF EXISTS player_account_type_player_id_key
;
ALTER TABLE public.player_account
  ADD CONSTRAINT player_account_type_player_id_key
  UNIQUE ("type", "player_id")
;
