import { MetaTag, Tooltip } from '@metafam/ds';
import {
  QuestCompletionStatus_Enum,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from 'graphql/autogen/types';
import React from 'react';

import { QuestRepetitionHint } from '../../utils/questHelpers';

export const RepetitionColors: Record<QuestRepetition_Enum, string> = {
  [QuestRepetition_Enum.Recurring]: 'cyan.700',
  [QuestRepetition_Enum.Personal]: 'blue.700',
  [QuestRepetition_Enum.Unique]: 'yellow.700',
};
interface RepetitionProps {
  repetition: QuestRepetition_Enum;
}
export const RepetitionTag: React.FC<RepetitionProps> = ({ repetition }) => (
  <Tooltip label={QuestRepetitionHint[repetition]}>
    <MetaTag
      size="md"
      fontWeight="normal"
      backgroundColor={RepetitionColors[repetition]}
    >
      {repetition}
    </MetaTag>
  </Tooltip>
);

export const StatusColors: Record<QuestStatus_Enum, string> = {
  [QuestStatus_Enum.Open]: 'green.700',
  [QuestStatus_Enum.Closed]: 'pink.700',
};
interface StatusProps {
  status: QuestStatus_Enum;
}
export const StatusTag: React.FC<StatusProps> = ({ status }) => (
  <MetaTag fontWeight="normal" size="md" backgroundColor={StatusColors[status]}>
    {status}
  </MetaTag>
);

export const CompletionStatusColors: Record<
  QuestCompletionStatus_Enum,
  string
> = {
  [QuestCompletionStatus_Enum.Accepted]: 'green.700',
  [QuestCompletionStatus_Enum.Rejected]: 'pink.700',
  [QuestCompletionStatus_Enum.Pending]: 'yellow.700',
};
interface QuestCompletionProps {
  status: QuestCompletionStatus_Enum;
}
export const CompletionStatusTag: React.FC<QuestCompletionProps> = ({
  status,
}) => (
  <MetaTag
    fontWeight="normal"
    size="md"
    backgroundColor={CompletionStatusColors[status]}
  >
    {status}
  </MetaTag>
);
