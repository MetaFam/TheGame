import {
  SetupPersonalityType
} from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import {
  getPersonalityComponents,
} from 'graphql/getPersonalityComponents';
import {
  PersonalityComponent, PersonalityComponents
} from 'graphql/types';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const personalityComponents = await getPersonalityComponents();

  return {
    props: {
      personalityComponents,
      hideAppDrawer: true
    }
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {

  const { personalityComponents } = props;
  const [personalityMask, setPersonalityMask] = (
    useState<PersonalityType>()
  );
  const { user } = useUser({ redirectTo: '/' });
  
  if (user?.player) {
    const { player } = user;
    if (!personalityMask && player.color_mask) {
      setPersonalityType(
        PersonalityTypes[player.color_mask]
      );
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPersonalityType 
          personalityTypeChoices={personalityTypeChoices} 
          personalityType={personalityType} 
          setPersonalityType={setPersonalityType} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PersonalityTypeSetup;
