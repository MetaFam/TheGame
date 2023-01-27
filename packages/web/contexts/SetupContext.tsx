import { useRouter } from 'next/router';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SetupOptions } from 'utils/setupOptions';

import { ComposeDBContextProvider } from './ComposeDBContext';

const urlPrefix = '/profile/setup/';

type SetupContextType = {
  options: SetupOptions;
  stepIndex: number;
  onNextPress: () => void;
  onBackPress: () => void;
  nextButtonLabel: string;
};

export const SetupContext = React.createContext<SetupContextType>({
  options: new SetupOptions(),
  stepIndex: 0,
  onNextPress: () => undefined,
  onBackPress: () => undefined,
  nextButtonLabel: 'Next Step',
});

export const SetupContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const options = useMemo(() => new SetupOptions(), []);

  const router = useRouter();

  const pageMatches = router.pathname.match(`${urlPrefix}(.+)`);
  const slug =
    pageMatches != null && pageMatches.length > 1 ? pageMatches[1] : null;
  const stepIndex = options.stepIndexMatchingSlug(slug);
  const currentStep = options.steps[stepIndex];

  const [nextButtonLabel, setNextButtonLabel] = useState('Next Step');

  useEffect(() => {
    if (options.isLastStep(stepIndex)) {
      setNextButtonLabel(currentStep.label);
    } else {
      const nextStep = options.steps[stepIndex + 1];
      const nextStepLabel = nextStep.label;
      setNextButtonLabel(`Next: ${nextStepLabel}`);
    }
  }, [options, stepIndex, setNextButtonLabel, currentStep]);

  const onNextPress = useCallback(() => {
    if (!options.isLastStep(stepIndex)) {
      const nextStep = options.steps[stepIndex + 1];
      router.push(`${urlPrefix}${nextStep.slug}`);
    }
  }, [router, options, stepIndex]);

  const onBackPress = useCallback(() => {
    if (stepIndex <= 0) {
      router.push('/');
    } else {
      const previousStep = options.steps[stepIndex - 1];
      router.push(`${urlPrefix}${previousStep.slug}`);
    }
  }, [router, options, stepIndex]);

  return (
    <ComposeDBContextProvider>
      <SetupContext.Provider
        value={{
          options,
          stepIndex,
          onNextPress,
          onBackPress,
          nextButtonLabel,
        }}
      >
        {children}
      </SetupContext.Provider>
    </ComposeDBContextProvider>
  );
};

export const useSetupFlow = (): SetupContextType => useContext(SetupContext);
