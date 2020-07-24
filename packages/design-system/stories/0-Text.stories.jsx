import { Stack, Text } from '@chakra-ui/core';
import React from 'react';

export default {
  title: 'Text',
  component: Text,
};

export const Sizes = () => (
  <Stack spacing={3}>
    <Text fontSize="6xl">In love with MetaGame</Text>
    <Text fontSize="5xl">In love with MetaGame</Text>
    <Text fontSize="4xl">In love with MetaGame</Text>
    <Text fontSize="3xl">In love with MetaGame</Text>
    <Text fontSize="2xl">In love with MetaGame</Text>
    <Text fontSize="xl">In love with MetaGame</Text>
    <Text fontSize="lg">In love with MetaGame</Text>
    <Text fontSize="md">In love with MetaGame</Text>
    <Text fontSize="sm">In love with MetaGame</Text>
    <Text fontSize="xs">In love with MetaGame</Text>
  </Stack>
);

export const Fonts = () => (
  <Stack spacing={3}>
    <Text fontSize="lg" fontFamily="heading">
      In love with MetaGame - Heading
    </Text>
    <Text fontSize="lg" fontFamily="heading" fontWeight="bold">
      In love with MetaGame - Heading Bold
    </Text>
    <Text fontSize="lg" fontFamily="body">
      In love with MetaGame - Body
    </Text>
    <Text fontSize="lg" fontFamily="body" fontWeight="bold">
      In love with MetaGame - Body Bold
    </Text>
    <Text fontSize="lg" fontFamily="mono">
      In love with MetaGame - Mono
    </Text>
    <Text fontSize="lg" fontFamily="mono" fontWeight="bold">
      In love with MetaGame - Mono Bold
    </Text>
  </Stack>
);
