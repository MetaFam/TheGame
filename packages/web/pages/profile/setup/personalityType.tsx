import {
  SetupPersonalityType
} from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import {
  getPersonalityParts,
} from 'graphql/getPersonalityParts';
import {
  PersonalityPart, PersonalityParts
} from 'graphql/types';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const personalityParts = await getPersonalityParts();

  return {
    props: {
      personalityParts,
      hideAppDrawer: true
    }
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {

  const { personalityParts } = props;
  const [personalityType, setPersonalityType] = (
    useState<PersonalityPart>()
  );
  const { user } = useUser({ redirectTo: '/' });
  
  if (user?.player) {
    const { player } = user;
    if (!personalityType && player.color_mask) {
      setPersonalityType(
        PersonalityTypes[player.color_mask]
      );
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType {...{
          personalityParts,
          personalityType,
          setPersonalityType,
        }}/>
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PersonalityTypeSetup;
