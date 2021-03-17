import { useRouter } from 'next/router';
import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { SetupOptions } from 'utils/setupOptions';

const urlPrefix = `/profile/setup/`;

type SetupContextType = {
  options: SetupOptions;
  stepIndex: number;
  onNextPress: () => void;
  onBackPress: () => void;
  onStartPress: () => void;
  onEndPress: () => void;
  nextButtonLabel: string;
};

export const SetupContext = (
  React.createContext<SetupContextType>({
    options: new SetupOptions(),
    stepIndex: 0,
    onNextPress: () => {},
    onBackPress: () => {},
    onStartPress: () => {},
    onEndPress: () => {},
    nextButtonLabel: 'Next Step',
  })
);

export const SetupContextProvider: React.FC = (
  ({ children }) => {
    const options = useMemo(() => new SetupOptions(), []);

    const router = useRouter();

    const pageMatches = router.pathname.match(`${urlPrefix}(.+)`);
    const slug = (
      (pageMatches != null && pageMatches.length > 1)
      ? pageMatches[1] : null
    );
    const stepIndex = options.stepIndexMatchingSlug(slug);
    const currentStep = options.steps[stepIndex];

    const [nextButtonLabel, setNextButtonLabel] = useState('Next Step');

    useEffect(() => {
      if (options.isLastStep(stepIndex)) {
        setNextButtonLabel(currentStep.label);
      } else {
        const nextStep = options.steps[stepIndex + 1];
        let nextStepLabel = nextStep.label;
        if (options.isFinalStepOfSection(stepIndex)) {
          nextStepLabel = options.sections[nextStep.sectionIndex].label;
        } 
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

    const onStartPress = () => {
      router.push('/');
    }

    const onEndPress = () => {
      const lastStep = options.steps.slice(-1)[0];
      router.push(`${urlPrefix}${lastStep.slug}`);
    }

    return (
      <SetupContext.Provider
        value={{
          options,
          stepIndex,
          onNextPress,
          onBackPress,
          onStartPress,
          onEndPress,
          nextButtonLabel,
        }}
      >
        {children}
      </SetupContext.Provider>
    );
  }
);

export const useSetupFlow = (
  (): SetupContextType => useContext(SetupContext)
);
