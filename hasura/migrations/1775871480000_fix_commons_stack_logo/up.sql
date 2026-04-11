-- Fix: Update The Commons Stack guild logo from broken Twitter URL to updated URL
-- Issue: https://github.com/MetaFam/TheGame/issues/1754
-- The old Twitter profile image URL no longer serves the correct image
UPDATE guild 
SET logo = 'https://pbs.twimg.com/profile_images/1679914332593717257/W5oihwAt_400x400.jpg'
WHERE id = '730350b4-42f5-4214-b11f-7a91e31bf484';
