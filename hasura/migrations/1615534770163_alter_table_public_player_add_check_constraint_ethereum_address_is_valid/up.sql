alter table "public"."player" add constraint "ethereum_address_is_valid" check (ethereum_address ~* '^0x([a-z0-9-]{40})$'::text);
