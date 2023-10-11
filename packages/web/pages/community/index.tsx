import {
  Box,
  Button,
  Flex,
  HStack,
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
}) => (
  <PageContainer>
    <VStack>
      <MetaHeading>Community</MetaHeading>
      <Box>
        <Tabs
          mt="2em"
          w={{
            lg: '100%',
          }}
        >
          <TabList ml={{ sm: '0em', lg: '4em' }} mr={{ sm: '0em', lg: '4em' }}>
            <Tab
              _selected={{
                color: 'teal.200',
                borderBottom: '2px solid #81E6D9',
              }}
              w="100%"
            >
              Players
            </Tab>
            <Tab
              _selected={{
                color: 'teal.200',
                borderBottom: '2px solid #81E6D9',
              }}
              w="100%"
            >
              Guilds
            </Tab>
            <Tab
              _selected={{
                color: 'teal.200',
                borderBottom: '2px solid #81E6D9',
              }}
              w="100%"
            >
              Patrons
            </Tab>
            {/* <Tab _selected={{ color: 'teal.200' }} w='100%'>Elders</Tab> */}
          </TabList>
          <TabPanels w="100%" p="0">
            <TabPanel>
              <Players />
            </TabPanel>
            <TabPanel>
              <GuildsPage guilds={guilds} />
            </TabPanel>
            <TabPanel>
              <PatronsPage patrons={patrons} pSeedPrice={pSeedPrice} />
            </TabPanel>
            {/* <TabPanel>
                Elders
              </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  </PageContainer>
);
export default UnifiedCommunityPage;
