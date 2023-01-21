import { Flex, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

type FieldProps = PropsWithChildren<{
  label: string;
  error?: FieldError;
}>;

export const Field: React.FC<FieldProps> = ({ label, error, children }) => (
  <Flex mb={2} w="full" align="center" direction="column">
    <Flex justify="space-between" w="full" mb={2}>
      <Text textStyle="caption" textAlign="left" ml={4}>
        {label}
      </Text>
      {error && (
        <Text textStyle="caption" textAlign="left" color="red.400" mr={4}>
          {error?.type === 'required' && 'Required'}
          {error?.type === 'pattern' && 'Invalid URL'}
          {error?.type === 'minLength' && 'Too short'}
          {error?.type === 'maxLength' && 'Too long'}
          {error?.type === 'min' && 'Too small'}
        </Text>
      )}
    </Flex>
    {children}
  </Flex>
);

export default Field;
