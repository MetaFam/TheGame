import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';

type SetupOption = {
  label: string;
  title: {
    [any: string]: string | undefined;
  };
  screens: Array<{
    label: string;
    component?: React.ReactNode;
    slug?: string;
  }>;
};

type SetupContextType = {
  options: Array<SetupOption>;
  step: number;
  screen: number;
  onNextPress: () => void;
  onBackPress: () => void;
  nextButtonLabel: string;
  numTotalSteps: number;
};

export const SetupContext = React.createContext<SetupContextType>({
  options: [],
  step: 0,
  screen: 0,
  onNextPress: () => undefined,
  onBackPress: () => undefined,
  nextButtonLabel: 'Next Step',
  numTotalSteps: 0,
});

type Props = {
  options: Array<SetupOption>;
};

export const SetupContextProvider: React.FC<Props> = ({
  children,
  options
}) => {
  const router = useRouter();
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
  }, [options, step, screen, setNextButtonLabel, numTotalSteps]);

  const onNextPress = useCallback(() => {
    const numScreens = options[step].screens.length;
    if (step >= numTotalSteps - 1 && screen >= numScreens - 1) return;
    if (screen + 1 >= numScreens) {
      setStep((step + 1) % numTotalSteps);
      setScreen(0);
    } else {
      setScreen((screen + 1) % numScreens);
    }
    router.push(`/profile/setup/${options[step].screens[(screen + 1) % numScreens].slug}`);
  }, [router, options, step, screen, setStep, setScreen, numTotalSteps]);

  const onBackPress = useCallback(() => {
    if (step <= 0 && screen <= 0) {
      router.push('/');
      return;
    }
    const numScreens = options[step].screens.length;
    if (screen <= 0) {
      setStep((step - 1) % numTotalSteps);
      setScreen(options[(step - 1) % numTotalSteps].screens.length - 1);
    } else {
      setScreen((screen - 1) % numScreens);
    }
  }, [router, options, step, screen, setStep, setScreen, numTotalSteps]);

  return (
    <SetupContext.Provider
      value={{
        options,
        step,
        screen,
        numTotalSteps,
        onNextPress,
        onBackPress,
        nextButtonLabel,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export const useSetupFlow = (): SetupContextType => useContext(SetupContext);
