import { Link } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getPersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import { useAnimation } from 'lib/hooks/players';
import React, { useEffect, useState } from 'react';
import { BOX_TYPE } from 'utils/boxTypes';

import { FlexContainer } from '../../Container';
import { ProfileSection } from '../../ProfileSection';
import { ColorBar } from '../ColorBar';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile: boolean;
  onRemoveClick: () => void;
};
export const PlayerColorDisposition: React.FC<Props> = ({
  player,
  isOwnProfile,
  onRemoveClick,
}) => {
  const [types, setTypes] = useState<{
    [any: string]: PersonalityOption;
  }>();
  const [colorDisposition, setColorDisposition] = useState<
    0 | PersonalityOption | undefined
  >();
  const mask = player?.color_aspect?.mask;
  const type = mask && types?.[mask];

  useEffect(() => {
    const loadTypes = async () => {
      const { types: list } = await getPersonalityInfo();
      setTypes(list);
    };
    loadTypes();
  }, []);

  const updateFN = () => setColorDisposition(type);
  const { animation } = useAnimation(type, updateFN);

  return (
    <ProfileSection
      title="Color Disposition"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
      boxType={BOX_TYPE.PLAYER_COLOR_DISPOSITION}
    >
      {colorDisposition && types && (
        <FlexContainer
          align="stretch"
          transition=" opacity 0.4s"
          opacity={animation === 'fadeIn' ? 1 : 0}
        >
          <Link
            isExternal
            href={`//dysbulic.github.io/5-color-radar/#/combos/${colorDisposition?.mask.toString(
              2,
            )}`}
            maxH="6rem"
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight="600"
          >
            <ColorBar mask={colorDisposition?.mask} />
          </Link>
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
