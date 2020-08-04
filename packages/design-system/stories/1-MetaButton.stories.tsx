import React from 'react';

import { ButtonGroup, MetaButton, Stack } from '../src';

export default {
  title: 'MetaButton',
  component: MetaButton,
};

export const Sizes = () => (
  <Stack spacing={4}>
    <ButtonGroup spacing={4}>
      <MetaButton size="xs">MetaButton</MetaButton>
      <MetaButton size="sm">MetaButton</MetaButton>
      <MetaButton size="md">MetaButton</MetaButton>
      <MetaButton size="lg">MetaButton</MetaButton>
    </ButtonGroup>
    <ButtonGroup spacing={4}>
      <MetaButton size="xs" variant="outline">
        MetaButton
      </MetaButton>
      <MetaButton size="sm" variant="outline">
        MetaButton
      </MetaButton>
      <MetaButton size="md" variant="outline">
        MetaButton
      </MetaButton>
      <MetaButton size="lg" variant="outline">
        MetaButton
      </MetaButton>
    </ButtonGroup>
  </Stack>
);

export const Variants = () => (
  <ButtonGroup spacing={4}>
    <MetaButton variant="solid">MetaButton</MetaButton>
    <MetaButton variant="outline">MetaButton</MetaButton>
    <MetaButton variant="ghost">MetaButton</MetaButton>
    <MetaButton variant="link">MetaButton</MetaButton>
  </ButtonGroup>
);
