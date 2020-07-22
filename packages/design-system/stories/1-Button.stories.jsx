import { Button, ButtonGroup } from '@chakra-ui/core';
import React from 'react';

export default {
  title: 'Button',
  component: Button,
};

export const Sizes = () => (
  <ButtonGroup spacing={4}>
    <Button variantColor="teal" size="xs">
      Button
    </Button>
    <Button variantColor="teal" size="sm">
      Button
    </Button>
    <Button variantColor="teal" size="md">
      Button
    </Button>
    <Button variantColor="teal" size="lg">
      Button
    </Button>
  </ButtonGroup>
);

export const Variants = () => (
  <ButtonGroup spacing={4}>
    <Button variantColor="teal" variant="solid">
      Button
    </Button>
    <Button variantColor="teal" variant="outline">
      Button
    </Button>
    <Button variantColor="teal" variant="ghost">
      Button
    </Button>
    <Button variantColor="teal" variant="link">
      Button
    </Button>
  </ButtonGroup>
);

export const Icons = () => (
  <ButtonGroup spacing={4}>
    <Button leftIcon="email" variantColor="teal" variant="solid">
      Email
    </Button>
    <Button rightIcon="arrow-forward" variantColor="teal" variant="outline">
      Call us
    </Button>
  </ButtonGroup>
);

export const Loading = () => (
  <ButtonGroup spacing={4}>
    <Button isLoading variantColor="teal" variant="solid">
      Email
    </Button>
    <Button
      isLoading
      loadingText="Submitting"
      variantColor="teal"
      variant="outline"
    >
      Submit
    </Button>
  </ButtonGroup>
);
