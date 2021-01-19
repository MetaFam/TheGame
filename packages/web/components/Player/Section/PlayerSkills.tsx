import { MetaTag, Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = { player: PlayerFragmentFragment; onRemoveClick: () => void };
export const PlayerSkills: React.FC<Props> = ({ player, onRemoveClick }) => {
  if (!player.Player_Skills?.length) {
    return null;
  }
  return (
    <ProfileSection title="Skills" onRemoveClick={onRemoveClick}>
      <Wrap>
        {(player.Player_Skills || []).map(({ Skill }) => (
          <MetaTag
            key={Skill.id}
            size="md"
            fontWeight="normal"
            backgroundColor={SkillColors[Skill.category]}
            pt={2}
            pb={2}
            pl={4}
            pr={4}
          >
            {Skill.name}
          </MetaTag>
        ))}
      </Wrap>
    </ProfileSection>
  );
};
