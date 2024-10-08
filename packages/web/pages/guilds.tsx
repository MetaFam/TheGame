import { Center, Link, Text, VStack } from '@metafam/ds';
import { InferGetStaticPropsType } from 'next';
import React, { lazy } from 'react';

import { GuildList } from '#components/Guild/GuildList';
import { HeadComponent } from '#components/Seo';
import { getGuilds } from '#graphql/queries/guild';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PageContainer = lazy(() => import('components/Container'));

export const getStaticProps = async () => ({
  props: {
    guilds: await getGuilds(),
  },
  revalidate: 1,
});

const GuildsPage: React.FC<Props> = ({ guilds }) => (
  <PageContainer overflow="hidden">
    <HeadComponent
      title="Guilds"
      description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…"
      url="https://metagame.wtf/guilds"
    />

    {/* VStack is used to make a consistent gap between the Join CTA and the Guilds list */}
    <VStack maxW="7xl" w="100%" spacing={{ base: 6, md: 8 }} pb={8}>
      <Center
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight={{ base: '400', md: '700' }}
        marginTop={{ base: 3, sm: 0 }}
        w="100%"
        maxW="4xl"
      >
        <Text as="p" textAlign="center">
          Want your project to appear here? Consider{' '}
          <Link
            href="/signup?tab=guild"
            color="pink.300"
            textDecoration="underline"
            whiteSpace="nowrap"
          >
            joining as a guild
          </Link>
          .
        </Text>
      </Center>

      {guilds && <GuildList {...{ guilds }} />}
    </VStack>
  </PageContainer>
);

export default GuildsPage;
