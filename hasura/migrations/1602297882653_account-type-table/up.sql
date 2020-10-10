
CREATE TABLE "public"."AccountType"("type" text NOT NULL, PRIMARY KEY ("type") );
INSERT INTO "AccountType" (type) VALUES
  ('ETHEREUM'),
  ('DISCORD'),
  ('GITHUB'),
  ('TWITTER'),
  ('DISCOURSE');

ALTER TABLE "public"."Account" ALTER COLUMN "type" TYPE text;

alter table "public"."Account"
           add constraint "Account_type_fkey"
           foreign key ("type")
           references "public"."AccountType"
           ("type") on update restrict on delete restrict;
