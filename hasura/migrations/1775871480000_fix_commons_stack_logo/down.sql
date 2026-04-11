-- Revert: Restore the original (broken) Commons Stack guild logo URL
UPDATE guild 
SET logo = 'https://pbs.twimg.com/profile_images/1138502303995039745/3uuHITMX_400x400.png'
WHERE id = '730350b4-42f5-4214-b11f-7a91e31bf484';
