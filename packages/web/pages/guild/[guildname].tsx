import { Box, Flex, LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { GuildHero } from 'components/Guild/GuildHero';
import { GuildLinks } from 'components/Guild/GuildLinks';
import { GuildPlayers } from 'components/Guild/Section/GuildPlayers';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { HeadComponent } from 'components/Seo';
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
import { BoxType } from 'utils/boxTypes';
import { getGuildCoverImageFull } from 'utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const GuildPage: React.FC<Props> = ({ guild }) => {
  const router = useRouter();

  // Hidden until implemented
  // BoxType.GUILD_SKILLS,
  // BoxType.GUILD_STATS,
  // BoxType.GUILD_QUESTS,
  // BoxType.GUILD_GALLERY,

  const boxes = [
    [BoxType.GUILD_PLAYERS],
    [BoxType.GUILD_ANNOUNCEMENTS, BoxType.GUILD_LINKS],
  ];

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!guild) {
    return <Error statusCode={404} />;
  }

  const getBox = (name: string): React.ReactNode => {
    switch (name) {
      case BoxType.GUILD_PLAYERS:
        return <GuildPlayers guildId={guild.id} guildname={guild.guildname} />;
      case BoxType.GUILD_LINKS:
        return <GuildLinks guild={guild} />;
      case BoxType.GUILD_ANNOUNCEMENTS:
        return (
          <ProfileSection title="Announcements">
            <p>No announcements.</p>
          </ProfileSection>
        );
      default:
        return <></>;
    }
  };

  return (
    <PageContainer p={0}>
      <Box
        background={`url(${getGuildCoverImageFull()}) no-repeat`}
        bgSize="cover"
        bgPos="center"
        h={72}
        position="absolute"
        w="full"
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
        <HeadComponent
          title={guild.name}
          description={`${guild.description}`}
          url={`https://my.metagame.wtf/guild/${guild.guildname}`}
          img={`${guild.logo}`}
        />
        <Flex
          align="center"
          direction={{ base: 'column', md: 'row' }}
          alignItems="flex-start"
          maxWidth="7xl"
        >
          <Box
            width={{ base: '100%', md: '50%', lg: '33%' }}
            mr={{ base: 0, md: 4 }}
          >
            <Box mb="6">
              <GuildHero guild={guild} />
            </Box>
          </Box>
          <Box
            width={{ base: '100%', md: '50%', lg: '66%' }}
            ml={{ base: 0, md: 4 }}
            mt={[0, 0, 100]}
            mb={[100, 100, 0]}
          >
            <Box width="100%">
              <Flex
                align="center"
                direction={{ base: 'column', lg: 'row' }}
                alignItems="flex-start"
              >
                <Box
                  width={{ base: '100%', lg: '50%' }}
                  mr={{ base: 0, lg: 4 }}
                >
                  {boxes[0].map((name) => (
                    <Box mb="6" key={name}>
                      {getBox(name)}
                    </Box>
                  ))}
                </Box>
                <Box
                  width={{ base: '100%', lg: '50%' }}
                  ml={{ base: 0, lg: 4 }}
                >
                  {boxes[1].map((name) => (
                    <Box mb="6" key={name}>
                      {getBox(name)}
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
      {/* to be implemented  */}
      {/* <ProfileSection title="Skills" />
      <ProfileSection title="Stats" />
      <ProfileSection title="Quests">
        {quests?.length ? (
          <p>Available quests</p>
        ) : (
          <p>Currently no available quests</p>
        )}
      </ProfileSection>
      <ProfileSection title="Gallery" /> */}
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
      guildId: guild.id,
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
