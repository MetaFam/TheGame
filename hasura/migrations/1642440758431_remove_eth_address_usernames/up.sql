UPDATE public.profile
  SET username = NULL
  WHERE username ~* '^0x[0-9a-z]{40}$'
;
