ALTER TABLE "public"."player" ADD COLUMN "sc_identity_id" text;
ALTER TABLE "public"."player" ALTER COLUMN "sc_identity_id" DROP NOT NULL;
ALTER TABLE "public"."player" ADD CONSTRAINT Player_scIdentityId_key UNIQUE (sc_identity_id);
