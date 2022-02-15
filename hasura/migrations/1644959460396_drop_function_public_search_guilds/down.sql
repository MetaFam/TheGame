CREATE OR REPLACE FUNCTION public.search_guilds(search text)
 RETURNS SETOF guild
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM guild
    WHERE
      guildname ILIKE search
$function$;
