import { Flex, Text } from '@metafam/ds';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { FieldError } from 'react-hook-form';

type FieldProps = PropsWithChildren<{
  label: string;
  error?: FieldError;
}>;

export const Field: React.FC<FieldProps> = ({ children, error, label }) => (
  <Flex pb={3} w="100%" direction="column">
    <Flex justify="space-between" w="100%" mb={2}>
      <Text textStyle="caption" textAlign="left" ml={4}>
        {label}
      </Text>

      <Text textStyle="caption" textAlign="left" color="red.400" mr={4}>
        {error?.type === 'required' && (error.message || 'Required')}
        {error?.type === 'pattern' && (error.message || 'Invalid URL')}
        {error?.type === 'minLength' && (error.message || 'Too short')}
        {error?.type === 'maxLength' && (error.message || 'Too long')}
        {error?.type === 'min' && (error.message || 'Too small')}
        {error?.type === 'validate' && (error.message || 'Invalid')}
      </Text>
    </Flex>

    {children}
  </Flex>
);

// testing to see if deployment will have lower performance than develop
export const FieldDescription: React.FC<PropsWithChildren> = ({ children }) => (
  <Text ml={4} mt={1} fontSize="sm">
    {children}
  </Text>
);
