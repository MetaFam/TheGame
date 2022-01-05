import { Link, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { ColorBar } from 'components/Player/ColorBar';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getPersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import { useAnimateProfileChanges } from 'lib/hooks/players';
import React, { useEffect, useState } from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  onRemoveClick?: () => void;
};
export const PlayerColorDisposition: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
  onRemoveClick,
}) => {
  const [, setTypes] = useState<{
    [any: string]: PersonalityOption;
  }>();
  const [colorDisposition, setColorDisposition] = useState<
    0 | PersonalityOption | undefined
  >();
  const mask = player?.profile?.colorMask;

  useEffect(() => {
    const load = async () => {
      const { types: list } = await getPersonalityInfo();
      setTypes(list);
    };

    load();
  }, [mask]);

  const updateFN = () => setColorDisposition(colorDisposition);
  const { animation } = useAnimateProfileChanges(colorDisposition, updateFN);

  return (
    <ProfileSection
      title="Color Disposition"
      boxType={BoxType.PLAYER.COLOR_DISPOSITION}
      {...{ onRemoveClick, isOwnProfile, canEdit }}
    >
      {!colorDisposition ? (
        <Text fontStyle="italic" textAlign="center">
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
            href={`//dysbulic.github.io/5-color-radar/#/combos/${colorDisposition.mask
              .toString(2)
              .padStart(5, '0')}`}
            maxH={125}
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight={600}
          >
            <ColorBar mask={colorDisposition.mask} />
          </Link>
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
