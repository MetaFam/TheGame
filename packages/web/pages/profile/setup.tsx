import BackgroundImage from 'assets/profile-background.jpg';
import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { SetupContext, SetupContextProvider } from 'contexts/SetupContext';
import { getSkills } from 'graphql/getSkills';
import { InferGetStaticPropsType } from 'next';
import React, { useContext } from 'react';
import { options } from 'utils/setupOptions';
import { parseSkills } from 'utils/skillHelpers';

const ProfileSetup: React.FC = () => {
  const { step, screen, numTotalSteps } = useContext(SetupContext);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {options[step].screens[screen].component}
      </FlexContainer>
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
