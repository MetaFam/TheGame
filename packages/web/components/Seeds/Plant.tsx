import { Box, Button, Image, Link, Text, VStack } from '@metafam/ds';
import Balancer from 'assets/seeds/balancer-plant.png';
import { GoLinkExternal } from 'react-icons/go';

export const Plant: React.FC = () => (
  <VStack spacing={4} my={8}>
    <Text>
      Planting Seeds means adding your Seeds to the liquidity pool.
      <br />
      To do so, go to this page, connect your wallet, & click "add liquidity".
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
        window.open(
          'https://app.balancer.fi/#/polygon/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081',
          '_blank',
        );
      }}
    />

    <Box>
      <Button
        as={Link}
        href="https://app.balancer.fi/#/polygon/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081"
        target="_blank"
        size="md"
        w="full"
        colorScheme="purple"
      >
        <Text mr={2}>Plant Seeds (Balancer)</Text>
        <GoLinkExternal />
      </Button>
    </Box>
  </VStack>
);
