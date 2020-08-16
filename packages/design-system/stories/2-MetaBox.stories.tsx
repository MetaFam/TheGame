import React from 'react';

import { MetaBox, MetaTag, Stack, Text } from '../src';

export default {
  title: 'MetaBox',
  component: MetaBox,
};

export const Default = () => (
  <MetaBox title="About me">
    <Text fontFamily="body" fontSize="2xl" fontWeight="bold" mb={4}>
      Name Nickname
    </Text>
    <Text fontFamily="body">
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam
      consequat sunt nostrud amet....
    </Text>
  </MetaBox>
);

export const WithTags = () => (
  <MetaBox title="Skills">
    <Stack spacing={2} isInline flexWrap="wrap" mb={-2}>
      <MetaTag mb={2}>Writing code</MetaTag>
      <MetaTag mb={2}>Observability</MetaTag>
      <MetaTag mb={2}>Dealing with ambiguity</MetaTag>
      <MetaTag mb={2}>Knowledge Sharing</MetaTag>
      <MetaTag mb={2}>Facilitation</MetaTag>
      <MetaTag mb={2}>Teamwork</MetaTag>
    </Stack>
  </MetaBox>
);
