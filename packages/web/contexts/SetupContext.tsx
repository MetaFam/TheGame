import React, { useCallback, useEffect, useState } from 'react';
import { options, PersonalityType, PlayerType } from 'utils/setupOptions';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

type SetupContextType = {
  step: number;
  screen: number;
  onNextPress: () => void;
  onBackPress: () => void;
  nextButtonLabel: string;
  numTotalSteps: number;
  skills: Array<SkillOption>;
  setSkills: React.Dispatch<React.SetStateAction<Array<SkillOption>>>;
  skillsList: Array<CategoryOption>;
  personalityType: PersonalityType | undefined;
  setPersonalityType: React.Dispatch<
    React.SetStateAction<PersonalityType | undefined>
  >;
  playerType: PlayerType | undefined;
  setPlayerType: React.Dispatch<React.SetStateAction<PlayerType | undefined>>;
};

export const SetupContext = React.createContext<SetupContextType>({
  step: 0,
  screen: 0,
  onNextPress: () => undefined,
  onBackPress: () => undefined,
  nextButtonLabel: 'Next Step',
  numTotalSteps: 0,
  skills: [],
  setSkills: () => undefined,
  skillsList: [],
  personalityType: undefined,
  setPersonalityType: () => undefined,
  playerType: undefined,
  setPlayerType: () => undefined,
});

type Props = {
  skillsList: Array<CategoryOption>;
};

export const SetupContextProvider: React.FC<Props> = ({
  children,
  skillsList,
}) => {
  const [step, setStep] = useState<number>(0);
  const [screen, setScreen] = useState<number>(0);
  const numTotalSteps = options.length;
  const [nextButtonLabel, setNextButtonLabel] = useState('Next Step');

  useEffect(() => {
    const numScreens = options[step].screens.length;
    if (step >= numTotalSteps - 1) {
      setNextButtonLabel(options[(step + 1) % numTotalSteps].label);
    }
    if (screen + 1 >= numScreens) {
      setNextButtonLabel(`Next: ${options[(step + 1) % numTotalSteps].label}`);
    } else {
      setNextButtonLabel(
        `Next: ${options[step].screens[(screen + 1) % numScreens].label}`,
      );
    }
  }, [step, screen, setNextButtonLabel, numTotalSteps]);

  const onNextPress = useCallback(() => {
    const numScreens = options[step].screens.length;
    if (step >= numTotalSteps - 1 && screen >= numScreens - 1) return;
    if (screen + 1 >= numScreens) {
      setStep((step + 1) % numTotalSteps);
      setScreen(0);
    } else {
      setScreen((screen + 1) % numScreens);
    }
  }, [step, screen, setStep, setScreen, numTotalSteps]);

  const onBackPress = useCallback(() => {
    if (step <= 0 && screen <= 0) return;
    const numScreens = options[step].screens.length;
    if (screen <= 0) {
      setStep((step - 1) % numTotalSteps);
      setScreen(options[(step - 1) % numTotalSteps].screens.length - 1);
    } else {
      setScreen((screen - 1) % numScreens);
    }
  }, [step, screen, setStep, setScreen, numTotalSteps]);

  const [skills, setSkills] = useState<Array<SkillOption>>([]);
  const [personalityType, setPersonalityType] = useState<PersonalityType>();
  const [playerType, setPlayerType] = useState<PlayerType>();

  return (
    <SetupContext.Provider
      value={{
        step,
        screen,
        numTotalSteps,
        onNextPress,
        onBackPress,
        nextButtonLabel,
        // skills
        skills,
        setSkills,
        skillsList,
        // personality
        personalityType,
        setPersonalityType,
        // player
        playerType,
        setPlayerType,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};
