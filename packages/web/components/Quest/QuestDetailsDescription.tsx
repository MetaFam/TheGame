import { Box, MarkdownViewer as Markdown, Prose } from '@metafam/ds';
import { isSGML } from '@metafam/utils';

import { QuestFragment } from '#graphql/autogen/hasura-sdk';
import { safelyParseNChakrifyHtml } from '#utils/stringHelpers';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsDescription: React.FC<Props> = ({ quest }) => {
  const descIsHtml = isSGML(quest.description ?? '');
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(quest.description ?? '')
    : null;

  return (
    <Box className="mg-article-typography">
      {descIsHtml ? (
        <Prose>{parsedDescription}</Prose>
      ) : (
        <Markdown>{quest.description}</Markdown>
      )}
    </Box>
  );
};
