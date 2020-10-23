import BackgroundImage from 'assets/profile-background.jpg';
import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { useSetupFlow } from 'contexts/SetupContext';
import React, { useEffect } from 'react';
import { useUser } from 'lib/hooks';
import { personalityTypes } from 'graphql/types';

export const SetupProfile: React.FC = () => {
  const {
    step,
    screen,
    numTotalSteps,
    options,
    setPersonalityType,
    setPlayerType,
    setAvailability,
    setSkills,
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  useEffect(() => {
    if (user?.player) {
      if (user.player.availability_hours) {
        setAvailability(user.player.availability_hours.toString());
      }
      if (user.player.EnneagramType) {
        setPersonalityType(personalityTypes[user.player.EnneagramType.name]);
      }
      if (user.player.playerType) {
        setPlayerType(user.player.playerType);
      }
      if (user.player.Player_Skills && user.player.Player_Skills.length > 0) {
        setSkills(
          user.player.Player_Skills.map((s) => ({
            value: s.Skill.id,
            label: s.Skill.name,
            ...s.Skill,
          })),
        );
      }
    }
  }, [user]);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {options[step].screens[screen].component}
      </FlexContainer>
    </PageContainer>
  );
};
