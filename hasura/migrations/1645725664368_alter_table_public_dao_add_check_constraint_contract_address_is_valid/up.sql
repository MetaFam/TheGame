alter table "public"."dao" add constraint "contract_address_is_valid" check (contract_address ~ '^0x([a-z0-9-]{40})$'::text);
