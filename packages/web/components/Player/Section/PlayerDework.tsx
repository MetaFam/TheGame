import { Box, Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useMemo, useState } from 'react';
import { getDeworkData } from 'utils/dework';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerDework: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const [deworkData, setDeworkData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      await getDeworkData(player?.ethereumAddress);
    };
    getData().then(setDeworkData);
  }, [player?.ethereumAddress]);

  return (
    <ProfileSection title="Dework Profile" {...{ isOwnProfile, editing }}>
      <Wrap>
        {deworkData && (
          <Box mb={4} display={'flex'} flexDirection={'column'}>
            <Text>Tasks completed: {deworkData?.tasks.length}</Text>
          </Box>
        )}
      </Wrap>
    </ProfileSection>
  );
};
