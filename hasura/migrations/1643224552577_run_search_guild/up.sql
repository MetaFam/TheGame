CREATE INDEX guildname_gin_idx ON guild
USING GIN (guildname gin_trgm_ops);

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
