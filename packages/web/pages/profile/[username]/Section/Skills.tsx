import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';

import { ProfileSection } from '../../../../components/ProfileSection';

type Props = { player: PlayerFragmentFragment };
const PlayerSkills: React.FC<Props> = ({ player }) => {
  if (!player.skills?.length) {
    return null;
  }
  return (
    <ProfileSection title="Skills">
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

export default PlayerSkills;
