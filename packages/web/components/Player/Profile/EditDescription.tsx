import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
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
      <Label htmlFor="description" userSelect="none">
        Bio
      </Label>
      <FormHelperText pb={3} color="white">
        A brief description of yourself shown on your profile.
      </FormHelperText>
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
      <FormHelperText py={1} color="white">
        {remaining} characters left.
      </FormHelperText>
      <FormErrorMessage>
        {errors.description?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
