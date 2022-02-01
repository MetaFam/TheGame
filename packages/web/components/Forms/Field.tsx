import { Flex, Text } from '@metafam/ds';
import React from 'react';
import { FieldError } from 'react-hook-form';

type FieldProps = {
  children: React.ReactNode;
  label: string;
  error?: FieldError;
};

export const Field: React.FC<FieldProps> = ({ children, error, label }) => (
  <Flex pb={3} w="100%" direction="column">
    <Flex justify="space-between" w="100%" mb={2}>
      <Text textStyle="caption" textAlign="left" ml={4}>
        {label}
      </Text>

      <Text textStyle="caption" textAlign="left" color="red.400" mr={4}>
        {error?.type === 'required' && 'Required'}
        {error?.type === 'pattern' && 'Invalid URL'}
        {error?.type === 'minLength' && 'Too short'}
        {error?.type === 'maxLength' && 'Too long'}
        {error?.type === 'min' && 'Too small'}
        {error?.type === 'validate' && error.message}
      </Text>
    </Flex>

    {children}
  </Flex>
);
