ALTER TABLE public.profile
  ADD CONSTRAINT profile_explorer_type_title_fkey
  FOREIGN KEY (explorer_type_title)
  REFERENCES public."ExplorerType"(title)
  ON UPDATE cascade ON DELETE restrict
;
