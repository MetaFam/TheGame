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
import { PageContainer } from 'components/Container';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import GuildsPage from 'pages/guilds';
import PatronsPage from 'pages/patrons';
import Players from 'pages/players';
import React, { useEffect, useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patronsLimit = 150;
  const patrons = await getPatrons(patronsLimit);

  const pSeedPrice = await getPSeedPrice().catch((error) => {
    console.error('Error fetching pSeed price', error);
    return null;
  });

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
              ml={{ sm: '0em', lg: '4em' }}
              mr={{ sm: '0em', lg: '4em' }}
            >
              {communityTabs.map(({ link }) => (
                <Tab
                  key={`tab-${link}`}
                  _selected={{
                    color: 'pastelPurple',
                    borderBottom: '2px solid var(--chakra-colors-pastelPurple)',
                  }}
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
