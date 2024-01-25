import { Box, Button, Image, Link, Text, VStack } from '@metafam/ds';
import Balancer from 'assets/seeds/balancer-trade.png';
import React from 'react';
import { GoLinkExternal } from 'react-icons/go';

export const Trade: React.FC = () => (
  <VStack spacing={4} my={8}>
    <Text>This is a place for you to sell or buy Seeds.</Text>
    <Text>
      As our own UI still doesn't exist, simply follow the link & search for
      "Seed".
    </Text>
    <Image
      borderRadius="12px"
      border="8px solid rgba(255, 255, 255, 0.10)"
      src={Balancer.src}
      alt="Droplet1"
      mx="auto"
      my={8}
      _hover={{
        cursor: 'pointer',
        boxShadow: '0px 0px 0px 2px #A48DF3',
        borderRadius: '12px',
        border: '8px solid rgba(255, 255, 255, 0.10)',
        transform: 'scale(1.005)',
        transition: 'all 0.1s ease-in-out',
      }}
      onClick={() => {
        window.open('https://app.balancer.fi/#/polygon/swap', '_blank');
      }}
    />

    <Box>
      <Button
        as={Link}
        href="https://app.balancer.fi/#/polygon/swap"
        target="_blank"
        size="md"
        w="full"
        colorScheme="purple"
      >
        <Text mr={2}>Trade Seeds (Balancer)</Text>
        <GoLinkExternal />
      </Button>
    </Box>
  </VStack>
);
