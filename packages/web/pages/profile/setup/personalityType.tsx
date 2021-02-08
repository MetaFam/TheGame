import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPersonalityTypes } from 'graphql/getPersonalityTypes';
import { PersonalityType, PersonalityTypes } from 'graphql/types';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const personalityTypeChoices = await getPersonalityTypes();

  return {
    props: {
      personalityTypeChoices,
      hideAppDrawer: true
    }
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<Props> = (props) => {

  const {personalityTypeChoices} = props;
  const [personalityType, setPersonalityType] = useState<PersonalityType>();
  const { user } = useUser({ redirectTo: '/' });
  
  if (user?.player) {
    const {player} = user;
    if (player.EnneagramType && !personalityType) {
      setPersonalityType(PersonalityTypes[player.EnneagramType.name]);
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
