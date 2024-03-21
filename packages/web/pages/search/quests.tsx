import { Box, LoadingState, Text, VStack } from '@metafam/ds';
import { QuestFilter } from 'components/Quest/QuestFilter';
import { QuestList } from 'components/Quest/QuestList';
import { questListDescriptionCss } from 'components/Quest/QuestListDescriptionCss';
import { HeadComponent } from 'components/Seo';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { useQuestFilter } from 'lib/hooks/quests';
import { useRouter } from 'next/router';
import { lazy, useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

type RoleChoices = Awaited<Promise<ReturnType<typeof getPlayerRoles>>>;

const PageContainer = lazy(() => import('components/Container'));

const QuestsSearchPage: React.FC = () => {
  const { query } = useRouter();
  const [roleChoices, setRoleChoices] = useState<RoleChoices>([]);
  const {
    quests,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  } = useQuestFilter();

  const searchQuery = Array.from(query.q ?? '')[0];

  const search = decodeURI(searchQuery);

  useEffect(() => {
    setQueryVariable('search', `%${search}%`);
  }, [search, setQueryVariable]);

  useEffect(() => {
    const setPlayerRoles = async () => {
      try {
        const res = await getPlayerRoles();
        setRoleChoices(res);
      } catch (err) {
        errorHandler(err as Error);
      }
    };
    setPlayerRoles();
  }, []);

  return (
    <PageContainer sx={questListDescriptionCss}>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <VStack w="100%" spacing={8} pb={8}>
        <QuestFilter
          quests={quests || []}
          {...{
            roleChoices,
            aggregates,
            queryVariables,
            setQueryVariable,
          }}
        />

        <Box w="full" maxW="7xl">
          <Box w="full">
            {fetching && <LoadingState />}
            {error && <Text>{`Error: ${error.message}`}</Text>}
            {quests && !fetching && <QuestList {...{ quests }} />}
          </Box>
        </Box>
      </VStack>
    </PageContainer>
  );
};

export default QuestsSearchPage;
