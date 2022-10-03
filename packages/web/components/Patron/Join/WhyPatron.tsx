import { Flex, Text } from '@metafam/ds';
import React from 'react';

export const WhyPatron: React.FC = () => (
  <Flex flexDirection="column">
    <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
      Why you should become a Patron of MetaGame?
    </Text>
    <Flex justify="end">
      <Text
        p="4"
        textAlign="right"
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        maxW="45rem"
        mr={5}
      >
        We prefer our patrons inrinsically motivated, so the main reason you'd
        want to become a patron is just the fact you love this whole idea of
        MetaGame & want to see it succeed. If you weren’t so damn busy, you’d
        probably join in on building it, but at this point, its easier for you
        to just pitch in a bucket of water & support the movement passively.
      </Text>
    </Flex>
  </Flex>
);
