import { Button, ButtonGroup } from '@chakra-ui/core';
import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons';
import React from 'react';

export default {
  title: 'Button',
  component: Button,
};

export const Sizes = () => (
  <ButtonGroup spacing={4}>
    <Button colorScheme="teal" size="xs">
      Button
    </Button>
    <Button colorScheme="teal" size="sm">
      Button
    </Button>
    <Button colorScheme="teal" size="md">
      Button
    </Button>
    <Button colorScheme="teal" size="lg">
      Button
    </Button>
  </ButtonGroup>
);

export const Variants = () => (
  <ButtonGroup spacing={4}>
    <Button colorScheme="teal" variant="solid">
      Button
    </Button>
    <Button colorScheme="teal" variant="outline">
      Button
    </Button>
    <Button colorScheme="teal" variant="ghost">
      Button
    </Button>
    <Button colorScheme="teal" variant="link">
      Button
    </Button>
  </ButtonGroup>
);

export const Icons = () => (
  <ButtonGroup spacing={4}>
    <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
      Email
    </Button>
    <Button
      rightIcon={<ArrowForwardIcon />}
      colorScheme="teal"
      variant="outline"
    >
      Call us
    </Button>
  </ButtonGroup>
);

export const Loading = () => (
  <ButtonGroup spacing={4}>
    <Button isLoading colorScheme="teal" variant="solid">
      Email
    </Button>
    <Button
      isLoading
      loadingText="Submitting"
      colorScheme="teal"
      variant="outline"
    >
      Submit
    </Button>
  </ButtonGroup>
);
