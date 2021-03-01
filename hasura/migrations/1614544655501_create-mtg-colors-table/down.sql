
ALTER TABLE "public"."player"
  DROP CONSTRAINT "player_color_fkey"
;

ALTER TABLE "public"."player"
  DROP COLUMN "color"
;

DROP TABLE "public"."ColorType";
