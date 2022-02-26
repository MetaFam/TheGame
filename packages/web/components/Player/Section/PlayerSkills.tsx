import { MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { useOverridableField } from 'lib/hooks';
import React from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerSkills: React.FC<Props> = ({
  player,
  isOwnProfile = false,
  editing = false,
}) => {
  const field = 'skills';
  const { value: skills } = useOverridableField({
    field,
    defaultValue: player.skills.map(({ Skill: skill }) => skill),
  });

  return (
    <ProfileSection
      title="Skills"
      modalTitle={false}
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_SKILLS}
      withoutBG
    >
      {!skills?.length ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          {isOwnProfile ? 'You haven’t ' : 'This player hasn’t '}
          defined any skills.
        </Text>
      ) : (
        <Wrap transition="opacity 0.4s" justify="center">
          {(skills || []).map(({ id, name, category }) => (
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
