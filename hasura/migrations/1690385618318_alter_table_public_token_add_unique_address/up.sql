alter table public.token DROP constraint IF EXISTS token_address_key;
alter table "public"."token" add constraint "token_address_key" unique ("address");
