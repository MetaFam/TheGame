import { PageContainer } from 'components/Container';
import { GuildList } from 'components/Guild/GuildList';
import SearchFilters from 'components/SearchFilters';
import { HeadComponent } from 'components/Seo';
import { GuildFragment } from 'graphql/autogen/types';
import { searchGuilds } from 'graphql/queries/guild';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GlobalFilters } from 'utils/GlobalSearch';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const GuildSearchPage = () => {
  const { query } = useRouter();
  const [guilds, setGuilds] = useState<Array<GuildFragment>>([]);
  const search: string = decodeURI(query.q as string);
  useEffect(() => {
    if (search) {
      const getData = async () => {
        const { guilds: gs } = await searchGuilds(search);
        setGuilds(gs);
      };
      getData();
    }
  }, [search]);
  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <SearchFilters activeFilter={GlobalFilters.GUILDS} search={search} />
      <GuildList {...{ guilds }} />
    </PageContainer>
  );
};
export default GuildSearchPage;
