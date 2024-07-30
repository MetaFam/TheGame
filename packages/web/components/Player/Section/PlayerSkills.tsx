import { MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import React, { useMemo } from 'react';

import { ProfileSection } from '#components/Section/ProfileSection';
import { Player } from '#graphql/autogen/hasura-sdk';
import { SkillColors } from '#graphql/types';
import { BoxTypes } from '#utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerSkills: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing = false,
}) => {
  const skills = useMemo(
    () => player.skills.map(({ Skill: skill }) => skill),
    [player.skills],
  );

  return (
    <ProfileSection
      title="Skills"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_SKILLS}
    >
      {!skills?.length ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          {isOwnProfile ? 'You haven’t ' : 'This player hasn’t '}
          defined any skills.
        </Text>
      ) : (
        <Wrap transition="opacity 0.4s" justify="center" pb={4}>
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
