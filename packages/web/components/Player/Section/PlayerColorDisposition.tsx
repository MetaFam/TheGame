import { Link, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { ColorBar } from 'components/Player/ColorBar';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { PersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useState } from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: Player;
  personalityInfo: PersonalityInfo;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};
export const PlayerColorDisposition: React.FC<Props> = ({
  player,
  personalityInfo: types,
  isOwnProfile,
  canEdit,
}) => {
  const [mask, setMask] = useState<number | null>(
    player?.profile?.colorMask ?? null,
  );

  const updateFN = () => setMask(mask);
  const { animation } = useAnimateProfileChanges(mask, updateFN);

  return (
    <ProfileSection
      title="Color Disposition"
      boxType={BoxType.PLAYER_COLOR_DISPOSITION}
      withoutBG
      {...{ isOwnProfile, canEdit }}
    >
      {mask == null ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified
        </Text>
      ) : (
        <FlexContainer
          align="stretch"
          transition="opacity 0.4s"
          opacity={animation === 'fadeIn' ? 1 : 0}
        >
          <Link
            isExternal
            href={`//dysbulic.github.io/5-color-radar/#/combos/${mask
              .toString(2)
              .padStart(5, '0')}`}
            maxH={125}
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight={600}
            _focus={{ border: 'none' }}
          >
            <ColorBar {...{ mask, types }} />
          </Link>
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
