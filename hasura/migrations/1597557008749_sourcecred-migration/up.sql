
ALTER TABLE "public"."Player"
  ALTER COLUMN "ethereum_address"
  DROP NOT NULL
;

ALTER TABLE "public"."Player"
  ADD COLUMN "scIdentityId"
  Text NULL UNIQUE
;

ALTER TABLE "public"."Account"
  DROP CONSTRAINT "Account_identifier_unique_key";
ALTER TABLE "public"."Account"
  ADD CONSTRAINT "Account_identifier_type_key"
  UNIQUE ("identifier", "type")
;
