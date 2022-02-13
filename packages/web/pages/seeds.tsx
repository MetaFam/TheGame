import { Flex, Heading, Image, LoadingState, VStack } from '@metafam/ds';
import Seeds from 'assets/menuIcon/seeds.svg';
import SeedsFlowChart from 'assets/seeds_flowchart.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React from 'react';

const SeedsPage: React.FC = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  return (
    <PageContainer py={8} px={4}>
      <VStack w="100%" spacing={{ base: 4, md: 8 }}>
        <HeadComponent
          title="MetaGame Seeds Page"
          description="seed description"
          url="https://my.metagame.wtf/seeds"
        />
        <Heading
          size="3xl"
          fontWeight={600}
          color="white"
          fontFamily="mono"
          pb={4}
          display="flex"
          flexDir="row"
        >
          Seeds{' '}
          <Image height={10} width={10} src={Seeds} alignSelf="end" ml={2} />
        </Heading>

        <Flex fontSize={18} flexDirection="column">
          Seeds are MetaGame’s labor token. <br />
          <br />
          People contribute towards creation of MetaGame, meanwhile generating
          XP & getting paid out on their XP generated - in Seeds.
          <br />
          <br />
          Here’s how it works (in Phase I*):
          <Image width="full" src={SeedsFlowChart} alignSelf="end" mt={4} />
        </Flex>
      </VStack>
    </PageContainer>
  );
};

export default SeedsPage;
