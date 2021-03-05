import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPersonalityInfo } from 'graphql/getPersonalityInfo';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps = async () => {
  const { types, parts } = await getPersonalityInfo();
  return {
    props: {
      personalityParts: parts,
      personalityTypes: types,
      hideAppDrawer: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {
  const { personalityParts, personalityTypes } = props;
  const { user } = useUser({ redirectTo: '/' });
  const [colorMask, setColorMask] = (
    useState<number | undefined>(user?.player?.ColorAspect?.mask)
  );

  const load = () => {
    const { player } = user ?? {};
    if (player) {
      if (colorMask === undefined && player.ColorAspect !== null) {
        console.info('SETTING MASK', player.ColorAspect?.mask)
        setColorMask(player.ColorAspect?.mask);
      }
    }
  }
  useEffect(load, [user])

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType
          {...{
            personalityParts,
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
