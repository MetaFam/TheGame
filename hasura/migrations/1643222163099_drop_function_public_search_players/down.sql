CREATE OR REPLACE FUNCTION public.search_players(search text)
 RETURNS SETOF player
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM player
    WHERE
      search <% (username || ' ' || ethereum_address)
    ORDER BY
      similarity(search, (username || ' ' || ethereum_address)) DESC;
$function$;
