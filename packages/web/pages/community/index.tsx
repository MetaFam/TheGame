import {
  Box,
  MetaHeading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@metafam/ds';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { getGuilds } from 'graphql/queries/guild';
import { Patron } from 'graphql/types';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import GuildsPage from 'pages/guilds';
import PatronsPage from 'pages/patrons';
import Players from 'pages/players';
import React, { lazy, useEffect, useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PageContainer = lazy(() => import('components/Container'));

export const getStaticProps = async () => {
  const patronsLimit = 150;
  let patrons: Array<Patron> = [];
  try {
    patrons = await getPatrons(patronsLimit);
  } catch (error) {
    console.error('Error fetching patrons:', error);
  }

  let pSeedPrice = null;
  try {
    pSeedPrice = await getPSeedPrice();
  } catch (error) {
    console.error('Error fetching pSeed price:', error);
  }

  return {
    props: {
      guilds: await getGuilds(),
      patrons,
      pSeedPrice,
    },
    revalidate: 1,
  };
};

const UnifiedCommunityPage: React.FC<Props> = ({
  guilds,
  patrons,
  pSeedPrice,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<{ link: string; index: number }>({
    link: 'Players',
    index: 0,
  });

  const communityTabs = [
    { link: 'Players', component: <Players /> },
    { link: 'Guilds', component: <GuildsPage guilds={guilds} /> },
    {
      link: 'Patrons',
      component: <PatronsPage patrons={patrons} pSeedPrice={pSeedPrice} />,
    },
  ];

  useEffect(() => {
    const { query } = router;
    if (query.tab) {
      const index = communityTabs.findIndex((tab) => tab.link === query.tab);
      setActiveTab({ link: query.tab as string, index });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleTabChange = (index: number) => {
    const tab = communityTabs[index];
    setActiveTab({ link: tab.link, index });
    router.push(`/community/?tab=${tab.link}`, undefined, { shallow: true });
  };

  return (
    <PageContainer>
      <VStack>
        <MetaHeading>Community</MetaHeading>
        <Box>
          <Tabs
            mt="2em"
            w={{
              lg: '100%',
            }}
            overflow={{ lg: 'hidden' }}
            index={activeTab.index}
            onChange={handleTabChange}
          >
            <TabList
              borderBottom="1px solid #2D2D2D"
              justifyContent="space-between"
              w="full"
              ml={{ sm: '0em', lg: '4em' }}
              mr={{ sm: '0em', lg: '4em' }}
            >
              {communityTabs.map(({ link }) => (
                <Tab
                  key={`tab-${link}`}
                  _selected={{
                    color: 'white',
                    borderBottom: '2px inset #A48DF3',
                  }}
                  color="gray.400"
                  w="100%"
                >
                  {link}
                </Tab>
              ))}
            </TabList>
            <TabPanels w="100%" p="0">
              {communityTabs.map(({ link, component }) => (
                <TabPanel key={`panel-${link}`}>{component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </PageContainer>
  );
};

export default UnifiedCommunityPage;
