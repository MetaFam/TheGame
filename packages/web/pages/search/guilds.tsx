import { GuildList } from 'components/Guild/GuildList';
import { GuildNotFound } from 'components/Guild/GuildNotFound';
import SearchFilters from 'components/SearchFilters';
import { HeadComponent } from 'components/Seo';
import { GuildFragment } from 'graphql/autogen/types';
import { searchGuilds } from 'graphql/queries/guild';
import { useRouter } from 'next/router';
import { lazy, useEffect, useState } from 'react';
import { GlobalFilters } from 'utils/GlobalSearch';

const PageContainer = lazy(() => import('components/Container'));

const GuildSearchPage: React.FC = () => {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guilds, setGuilds] = useState<Array<GuildFragment>>([]);
  const search: string = decodeURI(query.q as string);
  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const getData = async () => {
        try {
          const { guilds: gs } = await searchGuilds({ search });
          setGuilds(gs);
        } catch (err) {
          console.error('Unable to search guilds', err);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [search]);
  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <SearchFilters activeFilter={GlobalFilters.GUILDS} {...{ search }} />
      <GuildList {...{ guilds }} />
      {!isLoading && guilds.length === 0 && <GuildNotFound />}
    </PageContainer>
  );
};
export default GuildSearchPage;
