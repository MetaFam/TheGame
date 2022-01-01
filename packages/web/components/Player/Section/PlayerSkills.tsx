import { MetaTag, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/ProfileSection';
import {
  PlayerFragmentFragment,
  SkillCategory_Enum,
} from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  onRemoveClick?: () => void;
};
export const PlayerSkills: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
  onRemoveClick,
}) => {
  const [playerSkills, setPlayerSkills] = useState<
    { id: number; name: string; category: SkillCategory_Enum }[]
  >([]);

  const updateFN = () => {
    if (player.skills) {
      setPlayerSkills(
        player.skills.map((s) => ({
          id: s.Skill.id,
          name: s.Skill.name,
          category: s.Skill.category,
        })),
      );
    }
  };

  const { animation } = useAnimateProfileChanges(player.skills, updateFN);

  if (!player.skills?.length) {
    return null;
  }

  return (
    <ProfileSection
      title="Skills"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
      canEdit={canEdit}
      boxType={BoxType.PLAYER_SKILLS}
    >
      <Wrap transition=" opacity 0.4s" opacity={animation === 'fadeIn' ? 1 : 0}>
        {(playerSkills || []).map(({ id, name, category }) => (
          <WrapItem key={id}>
            <MetaTag
              size="md"
              fontWeight="normal"
              backgroundColor={SkillColors[category]}
            >
              {name}
            </MetaTag>
          </WrapItem>
        ))}
      </Wrap>
    </ProfileSection>
  );
};
