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
    timeZone,
    setTimeZone,
    skills,
    setSkills,
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const { address } = useWeb3();
  useEffect(() => {
    if (user?.player) {
      const {player} = user;
      if (
        player.username &&
        player.username.toLowerCase() !== address?.toLowerCase() &&
        !username
      ) {
        setUsername(player.username);
      }
      if (player.availability_hours && !availability) {
        setAvailability(player.availability_hours.toString());
      }
      if (player.EnneagramType && !personalityType) {
        setPersonalityType(PersonalityTypes[player.EnneagramType.name]);
      }
      if (player.playerType && !playerType) {
        setPlayerType(player.playerType);
      }
      if (
        player.Player_Skills &&
        player.Player_Skills.length > 0 &&
        skills.length === 0
      ) {
        setSkills(
          player.Player_Skills.map((s) => ({
            value: s.Skill.id,
            label: s.Skill.name,
            ...s.Skill,
          })),
        );
      }
      if (player.timezone && !timeZone) {
        setTimeZone(player.timezone);
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
    timeZone,
    setTimeZone,
    skills,
    setSkills,
  ]);

  return (
    <PageContainer>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {options[step].screens[screen].component}
      </FlexContainer>
    </PageContainer>
  );
};
