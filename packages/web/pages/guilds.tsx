import { Center, Link, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { GuildList } from 'components/Guild/GuildList';
import { HeadComponent } from 'components/Seo';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const guilds = await getGuilds();

  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

const GuildsPage: React.FC<Props> = ({ guilds }) => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Guilds"
      description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…"
      url="https://my.metagame.wtf/guilds"
    />

    {/* VStack is used to make a consistent gap between the Join CTA and the Guilds list */}
    <VStack maxW="7xl" w="100%" spacing={{ base: 6, md: 8 }} pb={8}>
      <Center
        fontSize={{
          base: 'sm',
          md: 'md',
        }}
        fontWeight={{
          base: '400',
          md: '700',
        }}
        marginTop={{
          base: 3, // Consistent gap between top and Players list on small screens
          sm: 0,
        }}
        w="100%"
        maxW="4xl"
      >
        <Text as="p" textAlign="center">
          Want your project to appear here? Consider{' '}
          <Link
            href="/join/guild"
            color="pink.300"
            textDecoration="underline"
            whiteSpace="nowrap"
          >
            joining as a guild
          </Link>
          .
        </Text>
      </Center>

      <GuildList {...{ guilds }} />
    </VStack>
  </PageContainer>
);

export default GuildsPage;
