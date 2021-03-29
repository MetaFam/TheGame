import { Box, Flex, LoadingState } from '@metafam/ds';
import { getGuild } from 'graphql/getGuild';
import { getGuilds } from 'graphql/getGuilds';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../components/Container';
import { GuildHero } from '../../components/Guild/GuildHero';
import { ProfileSection } from '../../components/ProfileSection';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const GuildPage: React.FC<Props> = ({ guild }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!guild) {
    return <Error statusCode={404} />;
  }

  return (
    <PageContainer>
      <Flex
        align="center"
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Box width={{ base: '100%', lg: '33%' }} mr={{ base: 0, lg: 4 }}>
          <Box mb="6">
            <GuildHero guild={guild} />
          </Box>
        </Box>
        <Box width={{ base: '100%', lg: '66%' }}>
          <Flex
            align="center"
            direction={{ base: 'column', lg: 'row' }}
            alignItems="flex-start"
          >
            <Box width={{ base: '100%', lg: '50%' }} mr={{ base: 0, lg: 4 }}>
              <Box mb="6">
                <ProfileSection title="Posts" />
              </Box>
            </Box>
            <Box width={{ base: '100%', lg: '50%' }}>
              <Box mb="6">
                <ProfileSection title="Skills" />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default GuildPage;

type QueryParams = { guildname: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const guilds = await getGuilds();

  return {
    paths: guilds.map(({ guildname }) => ({
      params: { guildname },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const guildname = context.params?.guildname;
  const guild = await getGuild(guildname);

  return {
    props: {
      guild: guild === undefined ? null : guild,
    },
    revalidate: 1,
  };
};
