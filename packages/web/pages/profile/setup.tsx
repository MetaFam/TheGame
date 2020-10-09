import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPersonalityTypes } from 'graphql/getPersonalityTypes';
import { getPlayerTypes } from 'graphql/getPlayerTypes';
import { getSkills } from 'graphql/getSkills';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { options as setupOptions } from 'utils/setupOptions';
import { parseSkills } from 'utils/skillHelpers';

export const getStaticProps = async () => {
  const [skills, personalityTypes, playerTypes] = await Promise.all([
    getSkills(),
    getPersonalityTypes(),
    getPlayerTypes(),
  ]);
  const skillsList = parseSkills(skills);

  return {
    props: {
      skillsList,
      personalityTypes,
      playerTypes,
      hidePageHeader: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProfileSetup: React.FC<Props> = (props) => (
  <SetupContextProvider options={setupOptions} {...props}>
    <SetupProfile />
  </SetupContextProvider>
);

export default ProfileSetup;
