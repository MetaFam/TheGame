
alter table "public"."Account" drop constraint "Account_identifier_type_key";
alter table "public"."Account" add constraint "Account_identifier_key" unique ("identifier");

ALTER TABLE "public"."Player" DROP COLUMN "scIdentityId";

ALTER TABLE "public"."Player" ALTER COLUMN "ethereum_address" SET NOT NULL;
