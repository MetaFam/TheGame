import { Box, Flex, LoadingState } from '@metafam/ds';
import { GuildPlayers } from 'components/Guild/Section/GuildPlayers';
import { QuestFragmentFragment, QuestStatus_Enum } from 'graphql/autogen/types';
import { getQuests } from 'graphql/getQuests';
import { getGuild, getGuildnames } from 'graphql/queries/guild';
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
import { GuildLinks } from '../../components/Guild/GuildLinks';
import { ProfileSection } from '../../components/ProfileSection';
import { HeadComponent } from '../../components/Seo';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const GuildPage: React.FC<Props> = ({ guild, quests }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!guild) {
    return <Error statusCode={404} />;
  }

  return (
    <PageContainer>
      <HeadComponent
        title={guild.name}
        description={`${guild.description}`}
        url={`https://my.metagame.wtf/guild/${guild.guildname}`}
        img={`${guild.logo}`}
      />
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
          <Box mb="6">
            <ProfileSection title="Skills" />
          </Box>
          <Box mb="6">
            <GuildLinks guild={guild} />
          </Box>
        </Box>
        <Box width={{ base: '100%', lg: '66%' }} ml={{ base: 0, lg: 4 }}>
          <Box width="100%">
            <Flex
              align="center"
              direction={{ base: 'column', lg: 'row' }}
              alignItems="flex-start"
            >
              <Box width={{ base: '100%', lg: '50%' }} mr={{ base: 0, lg: 4 }}>
                <Box mb="6">
                  <GuildPlayers
                    guildId={guild.id}
                    guildname={guild.guildname}
                  />
                </Box>
                <Box mb="6">
                  <ProfileSection title="Stats" />
                </Box>
              </Box>
              <Box width={{ base: '100%', lg: '50%' }} ml={{ base: 0, lg: 4 }}>
                <Box mb="6">
                  <ProfileSection title="Announcements">
                    <p>No announcements.</p>
                  </ProfileSection>
                </Box>
                <Box mb="6">
                  <ProfileSection title="Quests">
                    {quests?.length ? (
                      <p>Available quests</p>
                    ) : (
                      <p>Currently no available quests</p>
                    )}
                  </ProfileSection>
                </Box>
                <Box mb="6">
                  <ProfileSection title="Gallery" />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default GuildPage;

type QueryParams = { guildname: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const guildnames = await getGuildnames();

  return {
    paths: guildnames.map((guildname) => ({
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

  let quests: QuestFragmentFragment[] = [];
  if (guild != null) {
    quests = await getQuests({
      guild_id: guild.id,
      status: QuestStatus_Enum.Open,
    });
  }

  return {
    props: {
      guild: guild === undefined ? null : guild,
      quests,
    },
    revalidate: 1,
  };
};
