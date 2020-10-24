import BackgroundImage from 'assets/profile-background.jpg';
import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { useSetupFlow } from 'contexts/SetupContext';
import { PersonalityTypes } from 'graphql/types';
import { useUser, useWeb3 } from 'lib/hooks';
import React, { useEffect } from 'react';

export const SetupProfile: React.FC = () => {
  const {
    step,
    screen,
    numTotalSteps,
    options,
    username,
    setUsername,
    personalityType,
    setPersonalityType,
    playerType,
    setPlayerType,
    availability,
    setAvailability,
    skills,
    setSkills,
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const { address } = useWeb3();
  useEffect(() => {
    if (user?.player) {
      if (
        user.player.username &&
        user.player.username.toLowerCase() !== address?.toLowerCase() &&
        !username
      ) {
        setUsername(user.player.username);
      }
      if (user.player.availability_hours && !availability) {
        setAvailability(user.player.availability_hours.toString());
      }
      if (user.player.EnneagramType && !personalityType) {
        setPersonalityType(PersonalityTypes[user.player.EnneagramType.name]);
      }
      if (user.player.playerType && !playerType) {
        setPlayerType(user.player.playerType);
      }
      if (
        user.player.Player_Skills &&
        user.player.Player_Skills.length > 0 &&
        skills.length === 0
      ) {
        setSkills(
          user.player.Player_Skills.map((s) => ({
            value: s.Skill.id,
            label: s.Skill.name,
            ...s.Skill,
          })),
        );
      }
    }
  }, [
    user,
    address,
    username,
    setUsername,
    personalityType,
    setPersonalityType,
    playerType,
    setPlayerType,
    availability,
    setAvailability,
    skills,
    setSkills,
  ]);

  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {options[step].screens[screen].component}
      </FlexContainer>
    </PageContainer>
  );
};
