

CREATE TABLE "public"."SkillCategory"("name" text NOT NULL, PRIMARY KEY ("name") , UNIQUE ("name"));

INSERT INTO "SkillCategory" (name) VALUES
  ('CREATIVE'),
  ('BUSINESS'),
  ('COMMUNITY'),
  ('ENGINEERING'),
  ('PRODUCT'),
  ('SCIENCE'),
  ('TECHNOLOGIES');

ALTER TABLE "public"."Skill" ADD COLUMN "category" text NOT NULL;

alter table "public"."Skill"
           add constraint "Skill_category_fkey"
           foreign key ("category")
           references "public"."SkillCategory"
           ("name") on update restrict on delete restrict;
