import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = { player: PlayerFragmentFragment; onRemoveClick: () => void };
export const PlayerSkills: React.FC<Props> = ({ player, onRemoveClick }) => {
  if (!player.skills?.length) {
    return null;
  }
  return (
    <ProfileSection title="Skills" onRemoveClick={onRemoveClick}>
      <Wrap>
        {(player.skills || []).map(({ Skill }) => (
          <WrapItem key={Skill.id}>
            <MetaTag
              size="md"
              fontWeight="normal"
              backgroundColor={SkillColors[Skill.category]}
            >
              {Skill.name}
            </MetaTag>
          </WrapItem>
        ))}
      </Wrap>
    </ProfileSection>
  );
};
