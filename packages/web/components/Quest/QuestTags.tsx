import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { QuestFragmentFragment, QuestCompletionFragmentFragment, QuestCompletionStatus_Enum, QuestRepetition_Enum, QuestStatus_Enum } from "graphql/autogen/types";
import React from 'react';

import { SkillColors } from '../../graphql/types';

interface QuestProps {
  quest: QuestFragmentFragment,
}

export const RepetitionColors: Record<QuestRepetition_Enum, string> = {
  [QuestRepetition_Enum.Recurring]: 'cyan.700',
  [QuestRepetition_Enum.Personal]: 'blue.700',
  [QuestRepetition_Enum.Unique]: 'yellow.700',
};
export const RepetitionTag: React.FC<QuestProps> = ({ quest }) => (
  <MetaTag
    size="md"
    fontWeight="normal"
    backgroundColor={RepetitionColors[quest.repetition]}
  >
    {quest.repetition}
  </MetaTag>
)


export const StatusColors: Record<QuestStatus_Enum, string> = {
  [QuestStatus_Enum.Open]: 'green.700',
  [QuestStatus_Enum.Closed]: 'pink.700',
};
export const StatusTag: React.FC<QuestProps> = ({ quest }) => (
  <MetaTag
    fontWeight="normal"
    size="md"
    backgroundColor={StatusColors[quest.status]}
  >
    {quest.status}
  </MetaTag>
)

export const CompletionStatusColors: Record<QuestCompletionStatus_Enum, string> = {
  [QuestCompletionStatus_Enum.Accepted]: 'green.700',
  [QuestCompletionStatus_Enum.Rejected]: 'pink.700',
  [QuestCompletionStatus_Enum.Pending]: 'yellow.700',
};
interface QuestCompletionProps {
  questCompletion: QuestCompletionFragmentFragment,
}
export const CompletionStatusTag: React.FC<QuestCompletionProps> = ({ questCompletion }) => (
  <MetaTag
    fontWeight="normal"
    size="md"
    backgroundColor={CompletionStatusColors[questCompletion.status]}
  >
    {questCompletion.status}
  </MetaTag>
)


interface SkillsProps {
  maxSkills?: number,
}
export const SkillsTags: React.FC<SkillsProps & QuestProps> = ({ maxSkills = 4, quest }) => (
  <Wrap>
    {quest.quest_skills.slice(0, maxSkills).map(qs => (
      <WrapItem key={qs.skill.id}>
        <MetaTag
          size="md"
          fontWeight="normal"
          backgroundColor={SkillColors[qs.skill.category]}
        >
          {qs.skill.name}
        </MetaTag>
      </WrapItem>
    ))}
    {quest.quest_skills.length > maxSkills &&
    <WrapItem>
      <MetaTag
        size="md"
        fontWeight="normal"
      >
        {`+${quest.quest_skills.length - maxSkills}`}
      </MetaTag>
    </WrapItem>
    }
  </Wrap>
)

