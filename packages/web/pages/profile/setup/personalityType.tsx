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
  const [colorMask, setColorMask] = useState<number | undefined>();
  const { user } = useUser({ redirectTo: '/' });

  const load = () => {
    const { player } = user ?? {};
    console.info({ player })
    if (player) {
      if (!colorMask && player.ColorAspect !== null) {
        setColorMask(player.ColorAspect);
      }
    }
  }
  useEffect(load, [])

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
