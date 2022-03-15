DO $$DECLARE metafamid UUID;subId uuid;BEGIN
  SELECT id
  INTO   metafamid
  FROM   guild
  WHERE  NAME = 'MetaFam';

  SELECT id
  INTO   subid
  FROM   "QuestSubcategory"
  WHERE  NAME = 'Starter Quests'
  AND    category = 'Initiation';

  INSERT INTO quest
              (
                          "guild_id",
                          "title",
                          "category",
                          "subcategory_id"
              )
              VALUES
              (
                          metafamid,
                          'Subscribe to Substack',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Subscribe to Youtube',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Join Discord',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Join Forum',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Follow on twitter',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Pick a role',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Register your eth address',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Reg your forum username',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Ask anything',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Introduce yourself',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Join align/cohort',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Issues n ideas',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Brain exchange',
                          'Initiation',
                          subid
              )
              ,
              (
                          metafamid,
                          'Pick a path quest chain',
                          'Initiation',
                          subid
              ) ;

END;$$;
