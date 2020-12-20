import { HStack, Text } from '@metafam/ds';
import React from 'react';
import { FaMedal } from 'react-icons/fa';

import { PlayerSection } from './PlayerSection';

// TODO Fake data
type Props = { onRemoveClick: () => void };
export const PlayerAchievements: React.FC<Props> = ({ onRemoveClick }) => {
  const [show, setShow] = React.useState(false);
  const fakeData = [
    'Founding Father of MetaGame',
    'Summoner of Meta Fam',
    'Dragon Quests Quest',
  ];

  return (
    <PlayerSection title="Achievements" onRemoveClick={onRemoveClick}>
      {(fakeData || []).slice(0, show ? 999 : 3).map((title) => (
        <HStack alignItems="baseline" mb={3}>
          <FaMedal color="#FBB112" />
          <Text fontSize="md">{title}</Text>
        </HStack>
      ))}
      {(fakeData || []).length > 3 && (
        <Text
          as="span"
          fontFamily="body"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={() => setShow(!show)}
        >
          View {show ? 'less' : 'all'}
        </Text>
      )}
    </PlayerSection>
  );
};
