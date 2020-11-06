CREATE TABLE "public"."PersonalityType"("name" text NOT NULL, "code" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("code") , UNIQUE ("code"));

INSERT INTO "PersonalityType" (code, name, description) VALUES
  ('ISTJ', 'Inspector', 'Introverted, Sensing, Thinking, and Judging'),
  ('ISTP', 'CRAFTER', 'Introverted, Sensing, Thinking, and Perceiving'),
  ('ISFJ', 'PROTECTOR', 'Introverted, Sensing, Feeling, and Judging'),
  ('ISFP', 'ARTIST', 'Introverted, Sensing, Feeling, and Perceiving'),
  ('INFJ', 'ADVOCATE', 'Introverted, Intuitive, Feeling, and Judging'),
  ('INFP', 'MEDIATOR', 'Introverted, Intuitive, Feeling, and Perceiving'),
  ('INTJ', 'ARCHITECT', 'Introverted, Intuitive, Thinking, and Judging'),
  ('INTP', 'THINKER', 'Introverted, Intuitive, Thinking, and Perceiving'),
  ('ESTP', 'PERSUADER', 'Extroverted, Sensing, Thinking, and Perceiving'),
  ('ESTJ', 'DIRECTOR', 'Extroverted, Sensing, Thinking, and Judging'),
  ('ESFP', 'PERFORMER', 'Extroverted, Sensing, Feeling, and Perceiving'),
  ('ESFJ', 'CAREGIVER', 'Extroverted, Sensing, Feeling, and Judging'),
  ('ENFP', 'CHAMPION', 'Extroverted, Intuitive, Feeling, and Perceiving'),
  ('ENFJ', 'GIVER', 'Extroverted, Intuitive, Feeling, and Judging'),
  ('ENTP', 'DEBATER', 'Extroverted, Intuitive, Thinking, and Perceiving'),
  ('ENTJ', 'COMMANDER', 'Extroverted, Intuitive, Thinking, and Judging');

ALTER TABLE "public"."Player" ADD COLUMN "personality" text NULL;

alter table "public"."Player"
           add constraint "Player_personality_fkey"
           foreign key ("personality")
           references "public"."PersonalityType"
           ("code") on update restrict on delete restrict;
