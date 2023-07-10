import { Box, Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useMemo, useState } from 'react';
import { getDeworkData, processDeworkData } from 'utils/dework';

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
      await getDeworkData(player?.ethereumAddress).then((res: any) =>
        setDeworkData(res),
      );
    };
    getData();
  }, [player?.ethereumAddress]);

  const processedData = useMemo(
    () => processDeworkData(deworkData),
    [deworkData],
  );

  return (
    <ProfileSection title="Dework Profile" {...{ isOwnProfile, editing }}>
      <Wrap>
        {deworkData && processedData && (
          <Box mb={4} display={'flex'} flexDirection={'column'}>
            <Text>Tasks completed: {deworkData?.tasks.length}</Text>
            <Text>Tags: {processedData?.uniqueTags.length}</Text>
            <Text>
              Organisations: {processedData?.uniqueOrganisations.length}
            </Text>
            <Text>
              Earned: {(processedData.totalEarnedInUSDC / 10 ** 18).toFixed(2)}$
              (only counting USDC)
            </Text>
          </Box>
        )}
      </Wrap>
    </ProfileSection>
  );
};
