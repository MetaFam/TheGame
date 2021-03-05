ALTER TABLE "public"."player"
  ADD CONSTRAINT "username_is_valid"
  CHECK (username ~* '^[a-z0-9-](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9-]){0,40}[a-z0-9-]$')
;
