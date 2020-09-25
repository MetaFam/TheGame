import React, { useEffect, useState } from 'react';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

type SetupContextType = {
  useProgress: (numProgressSteps: number) => [number, () => void];
  step: number;
  progress: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  numTotalSteps: number;
  skills: Array<SkillOption>;
  setSkills: React.Dispatch<React.SetStateAction<Array<SkillOption>>>;
  skillsList: Array<CategoryOption>;
};

export const SetupContext = React.createContext<SetupContextType>({
  useProgress: (numProgressSteps: number) => [numProgressSteps, () => {}],
  step: 0,
  progress: 0,
  setStep: () => undefined,
  setProgress: () => undefined,
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
  const [progress, setProgress] = useState<number>(0.5);
  const numTotalSteps = 3;

  const useProgress: SetupContextType['useProgress'] = (numProgressSteps) => {
    const [currentProgress, setCurrentProgress] = useState<number>(0);

    useEffect(() => {
      const progressValue = (currentProgress + 1) / numProgressSteps;
      setProgress(progressValue);
    }, [currentProgress, numProgressSteps]);

    const onNextPress = () => {
      if ((currentProgress + 1) % numProgressSteps === 0) {
        setStep((_step) => (_step + 1) % numTotalSteps);
      } else {
        setCurrentProgress(
          (_currentProgress) => (_currentProgress + 1) % numProgressSteps,
        );
      }
    };

    return [currentProgress, onNextPress];
  };

  const [skills, setSkills] = useState<Array<SkillOption>>([]);

  return (
    <SetupContext.Provider
      value={{
        useProgress,
        step,
        progress,
        setStep,
        setProgress,
        numTotalSteps,
        skills,
        setSkills,
        skillsList,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};
