alter table "public"."dao" drop constraint "dao_contract_address_network_key";
alter table "public"."dao" add constraint "dao_contract_address_key" unique ("contract_address");
