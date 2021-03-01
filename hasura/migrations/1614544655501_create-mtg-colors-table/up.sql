
CREATE TABLE "public"."ColorType" (
  "name" text NOT NULL,
  "description" text NOT NULL,
  "mask" smallint NOT NULL,
  PRIMARY KEY ("name")
);

INSERT INTO "ColorType" (mask, name, description) VALUES
  (1, 'White', 'Peace through order.'),
  (2, 'Blue', 'Perfection through knowledge.'),
  (4, 'Black', 'Satisfaction through ruthlessness.'),
  (8, 'Red', 'Freedom through action.'),
  (16, 'Green', 'Harmony through acceptance.')
;

ALTER TABLE "public"."player"
  ADD COLUMN "color" text
;

alter table "public"."player"
  add constraint "player_color_fkey"
  foreign key ("color")
  references "public"."ColorType"
  ("name") on update restrict on delete restrict
;
