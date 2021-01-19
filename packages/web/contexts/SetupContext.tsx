import { Player_Type } from 'graphql/autogen/types';
import { Membership, PersonalityType } from 'graphql/types';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

type SetupOption = {
  label: string;
  title: {
    [any: string]: string | undefined;
  };
  screens: Array<{
    label: string;
    component: React.ReactNode;
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
  skillsList: Array<CategoryOption>;
  personalityTypes: Array<PersonalityType>;
  playerTypes: Array<Player_Type>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  skills: Array<SkillOption>;
  setSkills: React.Dispatch<React.SetStateAction<Array<SkillOption>>>;
  personalityType: PersonalityType | undefined;
  setPersonalityType: React.Dispatch<
    React.SetStateAction<PersonalityType | undefined>
  >;
  playerType: Player_Type | undefined;
  setPlayerType: React.Dispatch<React.SetStateAction<Player_Type | undefined>>;
  availability: string;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
  timeZone: string;
  setTimeZone: React.Dispatch<React.SetStateAction<string>>;
  memberships: Array<Membership> | null | undefined;
  setMemberships: React.Dispatch<
    React.SetStateAction<Array<Membership> | null | undefined>
  >;
};

export const SetupContext = React.createContext<SetupContextType>({
  options: [],
  step: 0,
  screen: 0,
  onNextPress: () => undefined,
  onBackPress: () => undefined,
  nextButtonLabel: 'Next Step',
  numTotalSteps: 0,
  skillsList: [],
  personalityTypes: [],
  playerTypes: [],
  username: '',
  setUsername: () => undefined,
  skills: [],
  setSkills: () => undefined,
  personalityType: undefined,
  setPersonalityType: () => undefined,
  playerType: undefined,
  setPlayerType: () => undefined,
  availability: '',
  setAvailability: () => undefined,
  timeZone: '',
  setTimeZone: () => undefined,
  memberships: undefined,
  setMemberships: () => undefined,
});

type Props = {
  options: Array<SetupOption>;
  skillsList: Array<CategoryOption>;
  personalityTypes: Array<PersonalityType>;
  playerTypes: Array<Player_Type>;
};

export const SetupContextProvider: React.FC<Props> = ({
  children,
  options,
  skillsList,
  personalityTypes,
  playerTypes,
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
  }, [options, step, screen, setStep, setScreen, numTotalSteps]);

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

  const [username, setUsername] = useState<string>('');
  const [skills, setSkills] = useState<Array<SkillOption>>([]);
  const [personalityType, setPersonalityType] = useState<PersonalityType>();
  const [playerType, setPlayerType] = useState<Player_Type>();
  const [availability, setAvailability] = useState<string>('');
  const [timeZone, setTimeZone] = useState<string>('');
  const [memberships, setMemberships] = useState<
    Array<Membership> | null | undefined
  >();

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
        // data
        skillsList,
        personalityTypes,
        playerTypes,
        // username
        username,
        setUsername,
        // skills
        skills,
        setSkills,
        // personalityType
        personalityType,
        setPersonalityType,
        // playerType
        playerType,
        setPlayerType,
        // availability
        availability,
        setAvailability,
        // time zone
        timeZone,
        setTimeZone,
        // memberships
        memberships,
        setMemberships,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export const useSetupFlow = (): SetupContextType => useContext(SetupContext);
