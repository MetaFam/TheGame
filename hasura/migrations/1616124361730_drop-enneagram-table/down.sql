CREATE TABLE public."EnneagramType"(
  name text NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (name)
);

INSERT INTO "EnneagramType" (name, description) VALUES
  ('REFORMER', 'Principled, Purposeful, Self-Controlled, and Perfectionistic'),
  ('HELPER', 'Demonstrative, Generous, People-Pleasing, and Possessive'),
  ('ACHIEVER', 'Adaptive, Excelling, Driven, and Image-Conscious'),
  ('INDIVIDUALIST', 'Expressive, Dramatic, Self-Absorbed, and Temperamental'),
  ('INVESTIGATOR', 'Perceptive, Innovative, Secretive, and Isolated'),
  ('LOYALIST', 'Engaging, Responsible, Anxious, and Suspicious'),
  ('ENTHUSIAST', 'Spontaneous, Versatile, Distractible, and Scattered'),
  ('CHALLENGER', 'Self-Confident, Decisive, Willful, and Confrontational'),
  ('PEACEMAKER', 'Receptive, Reassuring, Agreeable, and Complacent')
;

ALTER TABLE public.player
  ADD COLUMN enneagram text
;

ALTER TABLE public.player
  ADD CONSTRAINT "Player_enneagram_fkey"
  FOREIGN KEY (enneagram)
  REFERENCES public."EnneagramType"(name)
  ON UPDATE restrict ON DELETE restrict
;