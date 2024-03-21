import { Text, VStack } from '@metafam/ds';
import { getPSeedPrice, searchPatrons } from '@metafam/web/graphql/getPatrons';
import { PatronList } from 'components/Patron/PatronList';
import SearchFilters from 'components/SearchFilters';
import { HeadComponent } from 'components/Seo';
import { Patron } from 'graphql/types';
import { useRouter } from 'next/router';
import { lazy, useEffect, useState } from 'react';
import { GlobalFilters } from 'utils/GlobalSearch';

const PageContainer = lazy(() => import('components/Container'));

const PatronSearchPage: React.FC = () => {
  const { query } = useRouter();
  const searchQuery = Array.from(query.q ?? '')[0];

  const search = decodeURI(searchQuery);
  const [pSeedPrice, setPSeedPrice] = useState(0);
  const [patrons, setPatrons] = useState<Array<Patron>>([]);

  useEffect(() => {
    const getResults = async () => {
      const res = await searchPatrons(search);
      setPatrons(res);
      const resPSeedPrice = await getPSeedPrice().catch((error) => {
        console.error('Error fetching pSeed price', error);
        return null;
      });
      setPSeedPrice(resPSeedPrice ?? 0);
    };
    if (search) {
      getResults();
    }
  }, [search]);

  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <VStack w="100%" spacing={{ base: 4, md: 8 }} pb={{ base: 16, lg: 0 }}>
        <SearchFilters activeFilter={GlobalFilters.PATRONS} search={search} />
        <PatronList patrons={patrons} pSeedPrice={pSeedPrice} />
      </VStack>
    </PageContainer>
  );
};

export default PatronSearchPage;
