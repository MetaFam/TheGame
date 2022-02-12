import { Flex, LoadingState } from '@metafam/ds';
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
    <PageContainer p={0}>
      <HeadComponent
        title="MetaGame Seeds Page"
        description="seed description"
        url="https://my.metagame.wtf/seeds"
      />
      <Flex
        w="full"
        minH="100vh"
        pl={[4, 8, 12]}
        pr={[4, 8, 12]}
        pb={[4, 8, 12]}
        pt={200 - 72}
        direction="column"
        align="center"
        zIndex={1}
      >
        Seeds page
      </Flex>
    </PageContainer>
  );
};

export default SeedsPage;
