import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPersonalityInfo } from 'graphql/getPersonalityInfo';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps = async () => {
  const {
    types: personalityTypes,
    parts: personalityParts,
  } = await getPersonalityInfo();

  return {
    props: {
      personalityParts,
      personalityTypes,
      hideTopMenu: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {
  const { personalityTypes } = props;
  const { user } = useUser({ redirectTo: '/' });
  const [colorMask, setColorMask] = useState<number | undefined>(
    user?.player?.color_aspect?.mask,
  );

  const load = () => {
    const { player } = user ?? {};
    if (player) {
      if (colorMask === undefined && player.color_aspect !== null) {
        setColorMask(player.color_aspect?.mask);
      }
    }
  };
  useEffect(load, [user, colorMask]);

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType
          {...{
            personalityTypes,
            colorMask,
            setColorMask,
          }}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PersonalityTypeSetup;
