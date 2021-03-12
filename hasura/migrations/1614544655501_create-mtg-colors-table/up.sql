CREATE TABLE public."ColorAspect" (
  mask integer PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text NULL
);

INSERT INTO "ColorAspect" (mask, name) VALUES
   /*WUBRG*/
  (/*00000*/ 0, 'Colorless'),
  (/*00001*/ 'x01'::bit(8)::int, 'Harmony'),
  (/*00010*/ 'x02'::bit(8)::int, 'Freedom'),
  (/*00011*/ 'x03'::bit(8)::int, 'Authenticity'),
  (/*00100*/ 'x04'::bit(8)::int, 'Satisfaction'),
  (/*00101*/ 'x05'::bit(8)::int, 'Profanity'),
  (/*00110*/ 'x06'::bit(8)::int, 'Independence'),
  (/*00111*/ 'x07'::bit(8)::int, 'Realism'),
  (/*01000*/ 'x08'::bit(8)::int, 'Perfection'),
  (/*01001*/ 'x09'::bit(8)::int, 'Truth-Seeking'),
  (/*01010*/ 'x0A'::bit(8)::int, 'Creativity'),
  (/*01011*/ 'x0B'::bit(8)::int, 'Savagery'),
  (/*01100*/ 'x0C'::bit(8)::int, 'Growth Mindset'),
  (/*01101*/ 'x0D'::bit(8)::int, 'Ruthlessness'),
  (/*01110*/ 'x0E'::bit(8)::int, 'Iconoclasm'),
  (/*01111*/ 'x0F'::bit(8)::int, 'Chaos'),
  (/*10000*/ 'x10'::bit(8)::int, 'Peace'),
  (/*10001*/ 'x11'::bit(8)::int, 'Community'),
  (/*10010*/ 'x12'::bit(8)::int, 'Heroism'),
  (/*10011*/ 'x13'::bit(8)::int, 'Contentment'),
  (/*10100*/ 'x14'::bit(8)::int, 'Tribalism'),
  (/*10101*/ 'x15'::bit(8)::int, 'Endurance'),
  (/*10110*/ 'x16'::bit(8)::int, 'Speed'),
  (/*10111*/ 'x17'::bit(8)::int, 'Aggression'),
  (/*11000*/ 'x18'::bit(8)::int, 'Structure'),
  (/*11001*/ 'x19'::bit(8)::int, 'Complacence'),
  (/*11010*/ 'x1A'::bit(8)::int, 'Cunning'),
  (/*11011*/ 'x1B'::bit(8)::int, 'Altruism'),
  (/*11100*/ 'x1C'::bit(8)::int, 'Dedication'),
  (/*11101*/ 'x1D'::bit(8)::int, 'Growth'),
  (/*11110*/ 'x1E'::bit(8)::int, 'Artifice'),
  (/*11111*/ 'x1F'::bit(8)::int, 'Wholeness')
;

UPDATE "ColorAspect"
  SET description = 'Harmony through acceptance…'
  WHERE name = 'Harmony'
;
UPDATE "ColorAspect"
  SET description = 'Peace through order…'
  WHERE name = 'Peace'
;
UPDATE "ColorAspect"
  SET description = 'Perfection through knowledge…'
  WHERE name = 'Perfection'
;
UPDATE "ColorAspect"
  SET description = 'Satisfaction through ruthlessness…'
  WHERE name = 'Satisfaction'
;
UPDATE "ColorAspect"
  SET description = 'Freedom through action…'
  WHERE name = 'Freedom'
;

-- 
-- Add color_mask integer to player and set as a foreign key
-- 

ALTER TABLE public.player
  ADD COLUMN color_mask integer
;

ALTER TABLE public.player
  ADD CONSTRAINT player_color_mask_fkey
  FOREIGN KEY (color_mask)
  REFERENCES public."ColorAspect"(mask)
  ON UPDATE restrict ON DELETE restrict
;
