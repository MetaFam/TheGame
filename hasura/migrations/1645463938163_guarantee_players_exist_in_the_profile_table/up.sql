INSERT INTO profile (player_id)
  SELECT id FROM player
  WHERE id NOT IN (
    SELECT player_id FROM profile
  )
;
