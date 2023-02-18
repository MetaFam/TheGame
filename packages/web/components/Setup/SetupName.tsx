import { Flex, Input } from '@metafam/ds';
import { composeDBProfileFieldName } from '@metafam/utils';
import { useGetOwnProfileFieldFromComposeDB } from 'lib/hooks/ceramic/useGetOwnProfileFromComposeDB';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/ceramic/usePlayerSetupSaveToComposeDB';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useShowToastOnQueryError } from './SetupProfile';
import { WizardPane } from './WizardPane';

const field = composeDBProfileFieldName;

export const SetupName: React.FC = () => {
  const { error, result: existing } =
    useGetOwnProfileFieldFromComposeDB<string>(field);

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

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB<string>({
    isChanged: dirty,
  });

  return (
    <FormProvider {...formMethods}>
      <WizardPane<string>
        {...{ field, onSubmit, status }}
        title="Name"
        prompt="Hey! What's your name? 🙃"
      >
        <SetupNameInput />
      </WizardPane>
    </FormProvider>
  );
};

const SetupNameInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref: registerRef, ...props } = register(field, {
    maxLength: {
      value: 150,
      message: 'Maximum length is 150 characters.',
    },
  });

  return (
    <Flex justify="center" mt={5}>
      <Input
        background="dark"
        placeholder="NAME"
        w="auto"
        _focus={errors[field] ? { borderColor: 'red' } : undefined}
        ref={(ref) => {
          ref?.focus();
          registerRef(ref);
        }}
        {...props}
      />
    </Flex>
  );
};
