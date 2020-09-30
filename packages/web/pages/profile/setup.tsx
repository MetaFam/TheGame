import { PageContainer } from 'components/Container';
import { SetupDone } from 'components/Setup/SetupDone';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { SetupPersonality } from 'components/Setup/SetupPersonality';
import { SetupProfession } from 'components/Setup/SetupProfession';
import { SetupContext, SetupContextProvider } from 'contexts/SetupContext';
import { getSkills } from 'graphql/getSkills';
import { InferGetStaticPropsType } from 'next';
import BackgroundImage from 'public/images/profile-background.jpg';
import React, { useContext } from 'react';
import { parseSkills } from 'utils/skillHelpers';

const ProfileSetup: React.FC = () => {
  const { step, numTotalSteps } = useContext(SetupContext);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      {step === 0 && <SetupPersonality />}
      {step === 1 && <SetupProfession />}
      {step === 2 && <SetupDone />}
    </PageContainer>
  );
};

export const getStaticProps = async () => {
  const skills = await getSkills();
  const skillsList = parseSkills(skills);

  return {
    props: {
      skillsList,
      hidePageHeader: true,
    },
  };
};

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProfileSetupWithContext: React.FC<Props> = ({ skillsList }) => (
  <SetupContextProvider skillsList={skillsList}>
    <ProfileSetup />
  </SetupContextProvider>
);

export default ProfileSetupWithContext;
