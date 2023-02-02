import { Center, ITimezoneOption, SelectTimeZone, Text } from '@metafam/ds';
import { composeDBProfileFieldTimeZone } from '@metafam/utils';
import { mutationComposeDBCreateProfileTimeZone } from 'graphql/composeDB/mutations/profile';
import { composeDBDocumentProfileTimeZone } from 'graphql/composeDB/queries/profile';
import { useMounted } from 'lib/hooks';
import { usePlayerSetupSaveToComposeDB } from 'lib/hooks/usePlayerSetupSaveToComposeDB';
import { useQueryFromComposeDB } from 'lib/hooks/useQueryFromComposeDB';
import React, { useEffect } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { useShowToastOnQueryError } from './SetupProfile';
import { WizardPane } from './WizardPane';

const field = composeDBProfileFieldTimeZone;

export const SetupTimeZone: React.FC = () => {
  const { error, result: existing } = useQueryFromComposeDB<string>({
    indexName: composeDBDocumentProfileTimeZone,
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

  const { onSubmit, status } = usePlayerSetupSaveToComposeDB<string>({
    mutationQuery: mutationComposeDBCreateProfileTimeZone,
    isChanged: dirty,
  });

  return (
    <FormProvider {...formMethods}>
      <WizardPane
        {...{ field, onSubmit, status }}
        title="Time Zone"
        prompt="Which zone are you in?"
      >
        <SetupTimezoneInput />
      </WizardPane>
    </FormProvider>
  );
};

const SetupTimezoneInput: React.FC = () => {
  const { control } = useFormContext();
  const mounted = useMounted();

  return (
    <Center maxW="20rem" m="auto">
      <Controller
        {...{ control }}
        name={field}
        defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
        render={({ field: { onChange, ref, ...props } }) =>
          !mounted ? (
            <Text>⸘Not Mounted‽</Text> // avoiding “different className” error
          ) : (
            <SelectTimeZone
              labelStyle="abbrev"
              // todo persist the other two derived fields in the model as well.
              // this will require modifying the profile context to accept
              // multiple fields persisting on save
              onChange={(selection) => {
                onChange({ target: { value: selection.value } });
              }}
              {...props}
            />
          )
        }
      />
    </Center>
  );
};
