CREATE OR REPLACE FUNCTION public.search_players(search text)
 RETURNS SETOF player
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM player
    WHERE
      username ILIKE search OR ethereum_address ILIKE search
    ORDER BY
      season_xp DESC;
$function$;
