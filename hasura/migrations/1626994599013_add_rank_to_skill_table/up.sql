ALTER TABLE player_skill ADD COLUMN rank INTEGER DEFAULT NULL;
ALTER TABLE player_skill ADD COLUMN id UUID DEFAULT public.gen_random_uuid() NOT NULL;
