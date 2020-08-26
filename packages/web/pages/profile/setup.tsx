import { PageContainer } from 'components/Container';
import { SetupDone } from 'components/Setup/SetupDone';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { SetupPersonality } from 'components/Setup/SetupPersonality';
import { SetupProfession } from 'components/Setup/SetupProfession';
import { SetupContext, SetupContextProvider } from 'contexts/SetupContext';
import { getSkills } from 'graphql/getSkills';
import { parseSkills } from 'utils/skillHelpers';
import { InferGetStaticPropsType } from 'next';
import BackgroundImage from 'public/images/profile-background.jpg';
import React, { useContext } from 'react';

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
  const skillsMap = parseSkills(skills);

  return {
    props: {
      skillsMap,
      hidePageHeader: true,
    },
  };
};

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProfileSetupWithContext: React.FC<Props> = ({ skillsMap }) => (
  <SetupContextProvider skillsMap={skillsMap}>
    <ProfileSetup />
  </SetupContextProvider>
);

export default ProfileSetupWithContext;
