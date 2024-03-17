import { Flex, LoadingState } from '@metafam/ds';
import { EditableGridLayout } from 'components/EditableGridLayout';
import { GuildSection } from 'components/Guild/GuildSection';
import {
  ALL_BOXES,
  DEFAULT_GUILD_LAYOUT_DATA,
} from 'components/Guild/Section/config';
import { HeadComponent } from 'components/Seo';
import {
  GuildFragment,
  QuestFragment,
  QuestStatus_Enum,
  useGetAdministeredGuildsQuery,
  useUpdateGuildLayoutMutation,
} from 'graphql/autogen/types';
import { getQuests } from 'graphql/getQuests';
import { getGuild, getGuildnames } from 'graphql/queries/guild';
import { useUser } from 'lib/hooks';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, { lazy, ReactElement, useCallback, useMemo } from 'react';
import { BoxTypes, DisplayOutput, LayoutData } from 'utils/boxTypes';

type Props = { guild: GuildFragment };

const PageContainer = lazy(() => import('components/Container'));

const GuildPage: React.FC<Props> = ({ guild }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!guild) {
    return <Page404 />;
  }

  return (
    <PageContainer p={0}>
      <HeadComponent
        title={guild.name}
        description={`${(guild.description ?? '').replace('\n', ' ')}`}
        url={`https://metagame.wtf/guild/${guild.guildname}`}
        img={guild.logo ?? undefined}
      />
      <Flex
        w="full"
        h="min-content"
        direction="column"
        align="center"
        px={[0, 4, 8]}
      >
        <Grid {...{ guild }} />
      </Flex>
    </PageContainer>
  );
};

export default GuildPage;

export const Grid: React.FC<Props> = ({ guild }): ReactElement => {
  const { user } = useUser();
  const [
    { data: administeredGuildsData, fetching: loadingAdministeredGuilds },
  ] = useGetAdministeredGuildsQuery({
    variables: { id: user?.id },
  });
  const administeredGuilds = administeredGuildsData?.guild_metadata;

  const canAdministerGuild = useMemo(
    () =>
      !!user &&
      !loadingAdministeredGuilds &&
      !!administeredGuilds &&
      administeredGuilds.some(
        (guildMetadata) => guildMetadata.guildId === guild?.id,
      ),
    [user, loadingAdministeredGuilds, administeredGuilds, guild],
  );

  const [{ fetching: persisting }, saveLayoutData] =
    useUpdateGuildLayoutMutation();

  const persistLayoutData = useCallback(
    async (layoutData: LayoutData) => {
      if (!user) throw new Error('User is not set.');

      const { data, error } = await saveLayoutData({
        guildLayoutInfo: {
          uuid: guild.id,
          profileLayout: JSON.stringify(layoutData),
        },
      });

      const responseError = data?.saveGuildLayout?.error;

      if (error) throw error;

      if (responseError) throw new Error(responseError);
    },
    [saveLayoutData, user, guild.id],
  );

  const showAnnouncements = useMemo(
    () => !!guild && guild.showDiscordAnnouncements !== false,
    [guild],
  );

  const allBoxOptions = useMemo(
    () =>
      ALL_BOXES.filter(
        (b) => showAnnouncements || b !== BoxTypes.GUILD_ANNOUNCEMENTS,
      ),
    [showAnnouncements],
  );

  const defaultLayoutData = useMemo(
    () => ({
      ...DEFAULT_GUILD_LAYOUT_DATA,
      layoutItems: DEFAULT_GUILD_LAYOUT_DATA.layoutItems.filter(
        (item) =>
          showAnnouncements || item.type !== BoxTypes.GUILD_ANNOUNCEMENTS,
      ),
    }),
    [showAnnouncements],
  );

  const savedLayoutData = useMemo<LayoutData>(
    () =>
      guild.profileLayout ? JSON.parse(guild.profileLayout) : defaultLayoutData,
    [guild.profileLayout, defaultLayoutData],
  );

  return (
    <EditableGridLayout
      {...{
        guild,
        defaultLayoutData,
        savedLayoutData,
        showEditButton: canAdministerGuild,
        persistLayoutData,
        persisting,
        allBoxOptions,
        displayComponent: GuildSection as DisplayOutput,
        // pt: canAdministerGuild ? 0 : '4rem',
      }}
    />
  );
};

type QueryParams = { guildname: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const guildnames = await getGuildnames();

  return {
    paths:
      guildnames?.map((guildname) => ({
        params: { guildname },
      })) ?? [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const guildname = context.params?.guildname;
  const guild = await getGuild(guildname);

  let quests: QuestFragment[] = [];
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
      hideTopMenu: !guild,
    },
    revalidate: 1,
  };
};
