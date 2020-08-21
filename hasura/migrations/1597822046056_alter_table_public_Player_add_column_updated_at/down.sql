DROP TRIGGER IF EXISTS "set_public_Player_updated_at" ON "public"."Player";
ALTER TABLE "public"."Player" DROP COLUMN "updated_at";
