import { HStack, Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React from 'react';
import { FaMedal } from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';

// TODO Fake data
type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};
export const PlayerAchievements: React.FC<Props> = ({
  isOwnProfile,
  editing,
}) => {
  const [show, setShow] = React.useState(false);
  const fakeData = [
    'Fake Achievement No. 1',
    'Founding Father of MetaGame',
    'Summoner of Meta Fam',
  ];

  return (
    <ProfileSection
      title="Achievements"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_ACHIEVEMENTS}
      withoutBG
    >
      {(fakeData || []).slice(0, show ? 999 : 3).map((title) => (
        <HStack alignItems="baseline" mb={3} key={title}>
          <FaMedal color="#FBB112" />
          <Text fontSize="md">{title}</Text>
        </HStack>
      ))}
      {(fakeData || []).length > 3 && (
        <Text
          as="span"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={() => setShow(!show)}
        >
          View {show ? 'less' : 'all'}
        </Text>
      )}
    </ProfileSection>
  );
};
