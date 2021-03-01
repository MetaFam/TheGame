import {
  SetupPersonalityType
} from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import {
  getPersonalityParts, getPersonalityTypes,
} from 'graphql/getPersonalityInfo';
// import {
//   PersonalityPartInfo, PersonalityParts
// } from 'graphql/types';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      personalityParts: await getPersonalityParts(),
      personalityTypes: await getPersonalityTypes(),
      hideAppDrawer: true,
    },
  }
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {

  const { personalityParts, personalityTypes } = props;
  const [colorMask, setColorMask] = (
    useState<number | undefined>()
  );
  const { user } = useUser({ redirectTo: '/' });
  
  if (user?.player) {
    // const { player } = user;
    if (!colorMask /* && player.ColorAspect */) {
      // setColorMask(player.ColorAspect);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType {...{
          personalityParts,
          personalityTypes,
          colorMask,
          setColorMask,
        }}/>
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PersonalityTypeSetup;
