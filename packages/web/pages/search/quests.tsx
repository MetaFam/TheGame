import { PageContainer } from 'components/Container';
import { questListDescriptionCss } from 'components/Quest/QuestListDescriptionCss';
import { HeadComponent } from 'components/Seo';
import { useQuestFilter } from 'lib/hooks/quests';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const QuestsSearchPage: React.FC = () => {
  const { query } = useRouter();
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

  return (
    <PageContainer sx={questListDescriptionCss}>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
    </PageContainer>
  );
};

export default QuestsSearchPage;
