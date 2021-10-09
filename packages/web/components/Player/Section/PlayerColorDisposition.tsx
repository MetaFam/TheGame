import { Link } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getPersonalityInfo } from 'graphql/getPersonalityInfo';
import { PersonalityOption } from 'graphql/types';
import React, { useEffect } from 'react';

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
  const [types, setTypes] = React.useState<{
    [any: string]: PersonalityOption;
  }>();
  const mask = player?.color_aspect?.mask;
  const type = mask && types?.[mask];

  const loadTypes = async () => {
    const { types: list } = await getPersonalityInfo();
    setTypes(list);
  };
  useEffect(() => {
    loadTypes();
  }, []);

  return (
    <ProfileSection
      title="Color Disposition"
      onRemoveClick={onRemoveClick}
      isOwnProfile={isOwnProfile}
    >
      {type && types && (
        <Link
          isExternal
          href={`//dysbulic.github.io/5-color-radar/#/combos/${type.mask.toString(
            2,
          )}`}
          maxH="6rem"
          fontSize={{ base: 'md', sm: 'lg' }}
          fontWeight="600"
        >
          <ColorBar mask={type.mask} />
        </Link>
      )}
    </ProfileSection>
  );
};
