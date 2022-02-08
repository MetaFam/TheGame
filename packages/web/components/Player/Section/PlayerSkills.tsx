import { MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player, SkillCategory_Enum } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerSkills: React.FC<Props> = ({
  player,
  isOwnProfile = false,
  canEdit = false,
}) => {
  const [playerSkills, setPlayerSkills] = useState<
    Array<{ id: number; name: string; category: SkillCategory_Enum }>
  >(
    player.skills?.map((s) => ({
      id: s.Skill.id,
      name: s.Skill.name,
      category: s.Skill.category,
    })) ?? [],
  );

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

  return (
    <ProfileSection
      title="Skills"
      {...{ isOwnProfile, canEdit }}
      boxType={BoxType.PLAYER_SKILLS}
      withoutBG
    >
      {!player?.skills?.length ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          {isOwnProfile ? 'You haven’t ' : 'This player hasn’t '}
          defined any skills.
        </Text>
      ) : (
        <Wrap
          transition="opacity 0.4s"
          opacity={animation === 'fadeIn' ? 1 : 0}
          justify="center"
        >
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
      )}
    </ProfileSection>
  );
};
