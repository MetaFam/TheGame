
alter table "public"."Skill" drop constraint "Skill_category_fkey";

ALTER TABLE "public"."Skill" DROP COLUMN "category";

DROP TABLE "public"."SkillCategory";
