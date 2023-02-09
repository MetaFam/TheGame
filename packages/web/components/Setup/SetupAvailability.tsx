import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
} from '@metafam/ds';
import { composeDBProfileFieldAvailability } from '@metafam/utils';
import { mutationComposeDBCreateProfileAvailability } from 'graphql/composeDB/mutations/profile';
import { composeDBDocumentProfileAvailability } from 'graphql/composeDB/queries/profile';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import { useQueryFromComposeDB } from 'lib/hooks/ceramic/useQueryFromComposeDB';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useShowToastOnQueryError } from './SetupProfile';
import { WizardPane } from './WizardPane';

const field = composeDBProfileFieldAvailability;

export const SetupAvailability: React.FC = () => {
  const { error, result: existing } = useQueryFromComposeDB<string>({
    indexName: composeDBDocumentProfileAvailability,
    field,
  });

  useShowToastOnQueryError(error);

  const formMethods = useForm<{ [field]: string | undefined }>();
  const {
    watch,
    setValue,
    formState: { dirtyFields },
  } = formMethods;

  useEffect(() => {
    setValue(field, existing);
  }, [existing, setValue]);

  const current = watch(field, existing);
  const dirty = current !== existing || !!dirtyFields[field];

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB<number>({
    mutationQuery: mutationComposeDBCreateProfileAvailability,
    isChanged: dirty,
  });

  return (
    <FormProvider {...formMethods}>
      <WizardPane<number>
        {...{ field, onSubmit, status }}
        title="Avail&#xAD;ability"
        prompt="What is your weekly availability for any kind of freelance work?"
      >
        <SetupAvailabilityInput />
      </WizardPane>
    </FormProvider>
  );
};

const SetupAvailabilityInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref: registerRef, ...props } = register(field, {
    valueAsNumber: true,
    min: {
      value: 0,
      message: 'It’s not possible to be available for negative time.',
    },
    max: {
      value: 24 * 7,
      message: `More than 24 * 7 hours a week? Wow! Care to share your secret? 😉`,
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
          borderColor: errors[field] ? 'red' : 'white',
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
        _focus={errors[field] ? { borderColor: 'red' } : undefined}
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
};
