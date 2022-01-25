CREATE OR REPLACE VIEW public.me AS 
 SELECT player.id,
    profile.username,
    player.ethereum_address
   FROM player
   JOIN profile
   ON player.id = profile.player_id;
