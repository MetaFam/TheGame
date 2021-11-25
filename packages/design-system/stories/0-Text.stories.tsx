import React from 'react';

import { Box, Button, Heading, Link, Stack, Text } from '../src';

export default {
  title: 'Text',
  component: Text,
};

export const AllTypes = () => (
  <Stack spacing={3}>
    <Heading fontSize="3xl">Become a Player</Heading>

    <Text fontFamily="mono" fontSize="sm">
      I’ll do this later.{' '}
      <Button
        variant="link"
        size="sm"
        color="cyanText"
        fontWeight="normal"
        verticalAlign="inherit"
        onClick={console.log}
      >
        Go to my profile
      </Button>
    </Text>

    <Box>
      <Text fontSize="xl" fontFamily="heading">
        PΞTH
      </Text>
      <Text fontFamily="body" fontSize="md">
        @peth
      </Text>
    </Box>

    <Box>
      <Text
        fontFamily="body"
        fontSize="sm"
        fontWeight="bold"
        color="blueLight"
        textTransform="uppercase"
      >
        Role
      </Text>
      <Text fontFamily="body" fontSize="md" fontWeight="bold">
        Community Lead
      </Text>
    </Box>

    <Text textStyle="caption">About me</Text>

    <Box>
      <Text fontFamily="body" fontSize="2xl" fontWeight="bold">
        Peter Jursic
      </Text>
      <Text fontFamily="body" fontSize="md">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.{' '}
        <Button
          fontFamily="body"
          variant="link"
          size="sm"
          color="cyanText"
          fontWeight="normal"
          verticalAlign="inherit"
          onClick={console.log}
        >
          Read more
        </Button>
      </Text>

      <Link
        fontFamily="body"
        fontSize="sm"
        color="cyanText"
        href="https://metagame.wtf"
      >
        Go to external url
      </Link>
    </Box>

    <Box>
      <Text fontFamily="body" fontSize="lg" fontWeight="bold">
        The Reformer
      </Text>
      <Text fontFamily="body" fontSize="sm" color="blueLight">
        Principled, Purposeful, Self-Controlled, and Perfectionistic
      </Text>
    </Box>

    <Box>
      <Text fontFamily="body" fontSize="sm" fontWeight="bold" color="blueLight">
        MetaGame Discord Bots
      </Text>
      <Text fontFamily="body" fontSize="sm">
        Would be great to have the bot message every person promoted to MG
        Player with “Welcome to the game…” (an onboarding guide, something like
        this)
      </Text>
    </Box>
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
