import {
  FormControl,
  FormErrorMessage,
  InfoIcon,
  Text,
  Textarea,
  Tooltip,
} from '@metafam/ds';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from './Label';

const MAX_DESC_LEN = 420; // characters

export const EditDescription: React.FC = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const description = watch('description');
  const remaining = useMemo(
    () => MAX_DESC_LEN - (description?.length ?? 0),
    [description],
  );

  return (
    <FormControl isInvalid={!!errors.description}>
      <Tooltip label={`${MAX_DESC_LEN} characters max.`}>
        <Label htmlFor="description" userSelect="none">
          Bio
          <Text as="sup" ml={2}>
            {remaining}
          </Text>
          ⁄<Text as="sub">{MAX_DESC_LEN}</Text>
          <InfoIcon ml={2} />
        </Label>
      </Tooltip>
      <Textarea
        placeholder="Describe yourself."
        minW="min(18em, calc(100vw - 2rem))"
        color="white"
        bg="dark"
        {...register('description', {
          maxLength: {
            value: 420,
            message: 'Maximum length is 420 characters.',
          },
        })}
      />
      <FormErrorMessage>
        {errors.description?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
