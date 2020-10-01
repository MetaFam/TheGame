import React, { useCallback, useState } from 'react';
import { options } from 'utils/setupOptions';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

type SetupContextType = {
  step: number;
  screen: number;
  onNextPress: () => void;
  onBackPress: () => void;
  numTotalSteps: number;
  skills: Array<SkillOption>;
  setSkills: React.Dispatch<React.SetStateAction<Array<SkillOption>>>;
  skillsList: Array<CategoryOption>;
};

export const SetupContext = React.createContext<SetupContextType>({
  step: 0,
  screen: 0,
  onNextPress: () => undefined,
  onBackPress: () => undefined,
  numTotalSteps: 0,
  skills: [],
  setSkills: () => undefined,
  skillsList: [],
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

  return (
    <SetupContext.Provider
      value={{
        step,
        screen,
        numTotalSteps,
        onNextPress,
        onBackPress,
        // data
        skills,
        setSkills,
        skillsList,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};
