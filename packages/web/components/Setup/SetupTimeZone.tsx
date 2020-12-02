import {
  MetaButton,
  MetaHeading,
  MetaTheme,
  SelectSearch,
  selectStyles,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {tz} from 'moment-timezone';
import React from 'react';

export const SetupTimeZone: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    timeZone,
    setTimeZone
  } = useSetupFlow();

  const timeZoneNames = tz.names();

  const styles: typeof selectStyles = {
    ...selectStyles
  };

  return (
    <FlexContainer>
      <MetaHeading mb={10} mt={-64} textAlign="center">
        What time zone are you in?
      </MetaHeading>
      <FlexContainer w="100%" align="stretch" maxW="50rem">
        <SelectSearch
          styles={styles}
          value={timeZone}
          onChange={(value) => setTimeZone(value)}
          options={timeZoneNames}
          autoFocus
        />
      </FlexContainer>
      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
