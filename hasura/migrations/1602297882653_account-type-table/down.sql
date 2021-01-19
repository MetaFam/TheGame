
alter table "public"."Account" drop constraint "Account_type_fkey";

ALTER TABLE "public"."Account" ALTER COLUMN "type" TYPE text;

DROP TABLE "public"."AccountType";
