import { Avatar, Box, VStack } from '@metafam/ds';
import React from 'react';

export const Leaderboard: React.FC = () => (
  <VStack
    className="leaderboard"
    width="100%"
    mt={5}
    fontFamily="exo2"
    fontWeight="700"
  >
    <Box
      className="player player__chip"
      display="flex"
      width="100%"
      px={8}
      py={2}
      flexFlow="row nowrap"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor="blackAlpha.500"
      borderRadius="md"
    >
      <Box className="player__position" flex={0} mr={3}>
        1
      </Box>
      <Avatar
        className="player__avatar"
        bg="cyan.200"
        border="2px solid"
        borderColor="diamond"
        src="https://pbs.twimg.com/profile_images/1349660293778067456/x4HwomRZ_400x400.jpg"
        mr={3}
      />
      <Box className="player__name">pΞTH</Box>
      <Box className="player__score" textAlign="right" flex={1}>
        429
      </Box>
    </Box>
    <Box
      className="player player__chip"
      display="flex"
      width="100%"
      px={8}
      py={2}
      flexFlow="row nowrap"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor="blackAlpha.500"
      borderRadius="md"
    >
      <Box className="player__position" flex={0} mr={3}>
        2
      </Box>
      <Avatar
        className="player__avatar"
        bg="cyan.200"
        border="2px solid"
        borderColor="diamond"
        src="https://pbs.twimg.com/profile_images/964343435682512896/JEnt0Aed_400x400.jpg"
        mr={3}
      />
      <Box className="player__name">Misanth</Box>
      <Box className="player__score" textAlign="right" flex={1}>
        390
      </Box>
    </Box>
    <Box
      className="player player__chip"
      display="flex"
      width="100%"
      px={8}
      py={2}
      flexFlow="row nowrap"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor="blackAlpha.500"
      borderRadius="md"
    >
      <Box className="player__position" flex={0} mr={3}>
        3
      </Box>
      <Avatar
        className="player__avatar"
        bg="cyan.200"
        border="2px solid"
        borderColor="diamond"
        src="https://metafam.imgix.net/https%3A%2F%2Fipfs.infura.io%2Fipfs%2FQmRKgJ6nA8CaxDRFYQ2o7SLVF4N8zGbezEKnC993foTZX5?ixlib=js-2.3.2&amp;ar=1%3A1&amp;height=200&amp;s=3f23e361b4ac8a70e211a706b95398a9"
        mr={3}
      />
      <Box className="player__name">luxumbra</Box>
      <Box className="player__score" textAlign="right" flex={1}>
        321
      </Box>
    </Box>
    <Box
      className="player player__chip"
      display="flex"
      width="100%"
      px={8}
      py={2}
      flexFlow="row nowrap"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor="blackAlpha.500"
      borderRadius="md"
    >
      <Box className="player__position" flex={0} mr={3}>
        4
      </Box>
      <Avatar
        className="player__avatar"
        bg="cyan.200"
        border="2px solid"
        borderColor="diamond"
        src="https://metafam.imgix.net/https%3A%2F%2Fipfs.infura.io%2Fipfs%2FQmXqFv1JQrUvyVEZXSsriJrxgx9uhBX99RessphRCX5D8j?ixlib=js-2.3.2&amp;ar=1%3A1&amp;height=200&amp;s=ed9e9235a18d845328ddc473bf7bfe5d"
        mr={3}
      />
      <Box className="player__name">Alec</Box>
      <Box className="player__score" textAlign="right" flex={1}>
        305
      </Box>
    </Box>
  </VStack>
);
