import { MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import { Player } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { useMemo } from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerSkills: React.FC<Props> = ({ editing = false }) => {
  const { user } = useUser();
  const { hydratedPlayer: player } = usePlayerHydrationContext();

  const skills = useMemo(
    () => player.skills.map(({ Skill: skill }) => skill),
    [player.skills],
  );

  const isOwnProfile = user && user.id === player.id;

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
