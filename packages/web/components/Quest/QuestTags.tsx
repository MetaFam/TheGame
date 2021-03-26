import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { QuestFragmentFragment, QuestRepetition_Enum, QuestStatus_Enum } from "graphql/autogen/types";
import React from 'react';

import { SkillColors } from '../../graphql/types';

interface Props {
  quest: QuestFragmentFragment,
}

export const RepetitionColors: Record<QuestRepetition_Enum, string> = {
  [QuestRepetition_Enum.Recurring]: 'cyan.700',
  [QuestRepetition_Enum.Personal]: 'blue.700',
  [QuestRepetition_Enum.Unique]: 'yellow.700',
};
export const RepetitionTag: React.FC<Props> = ({ quest }) => (
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
export const StatusTag: React.FC<Props> = ({ quest }) => (
  <MetaTag
    fontWeight="normal"
    size="md"
    backgroundColor={StatusColors[quest.status]}
  >
    {quest.status}
  </MetaTag>
)


interface SkillsProps {
  firstN?: number,
}
export const SkillsTags: React.FC<SkillsProps & Props> = ({ firstN = 4, quest }) => (
  <Wrap>
    {quest.quest_skills.slice(0, firstN).map(qs => (
      <WrapItem>
        <MetaTag
          size="md"
          fontWeight="normal"
          backgroundColor={SkillColors[qs.skill.category]}
        >
          {qs.skill.name}
        </MetaTag>
      </WrapItem>
    ))}
    {quest.quest_skills.length > firstN &&
    <WrapItem>
      <MetaTag
        size="md"
        fontWeight="normal"
      >
        {`+${quest.quest_skills.length - firstN}`}
      </MetaTag>
    </WrapItem>
    }
  </Wrap>
)

