
ALTER TABLE "public"."Player" ALTER COLUMN "ethereum_address" DROP NOT NULL;

ALTER TABLE "public"."Player" ADD COLUMN "scIdentityId" Text NULL UNIQUE;

alter table "public"."Account" drop constraint "Account_identifier_unique_key";
alter table "public"."Account" add constraint "Account_identifier_type_key" unique ("identifier", "type");
