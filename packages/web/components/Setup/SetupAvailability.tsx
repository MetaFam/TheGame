import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
} from '@metafam/ds';
import React from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

export const SetupAvailability: React.FC = () => {
  const field = 'availableHours';

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Avail&#xAD;ability"
      prompt="What is your weekly availability for any kind of freelance work?"
    >
      {({ register, errored = false }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          valueAsNumber: true,
          min: {
            value: 0,
            message: 'It’s not possible to be available for negative time.',
          },
          max: {
            value: 24 * 7,
            message: `There’s only ${24 * 7} hours in a week.`,
          },
        });

        return (
          <InputGroup
            mb={10}
            maxW="10rem"
            margin="auto"
            borderColor="purple.700"
            sx={{
              ':hover, :focus-within': {
                borderColor: errored ? 'red' : 'white',
              },
            }}
          >
            <InputLeftElement>
              <Text as="span" role="img" aria-label="clock">
                🕛
              </Text>
            </InputLeftElement>
            <Input
              type="number"
              placeholder="23…"
              pl={9}
              background="dark"
              borderTopEndRadius={0}
              borderBottomEndRadius={0}
              borderRight={0}
              _focus={errored ? { borderColor: 'red' } : undefined}
              autoFocus
              ref={(ref) => {
                ref?.focus();
                registerRef(ref);
              }}
              {...props}
            />
            <InputRightAddon bg="purpleBoxDark" color="white">
              <Text as="sup">hr</Text> ⁄ <Text as="sub">week</Text>
            </InputRightAddon>
          </InputGroup>
        );
      }}
    </ProfileWizardPane>
  );
};
