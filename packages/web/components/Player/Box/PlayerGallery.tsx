import { Box, Flex, HStack, Text } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import nft1Image from '../../../assets/fake/nft1.png';
import nft2Image from '../../../assets/fake/nft2.png';
import { PlayerBox } from './PlayerBoxe';

// TODO Fake data
type Props = { player: PlayerFragmentFragment; setRemoveBox: () => void };
export const PlayerGallery: React.FC<Props> = ({ player, setRemoveBox }) => {
  const [show, setShow] = React.useState(false);
  const fakeEthPrice = 500;
  const fakeData = [
    { title: 'CryptoMon Cards - Aave', priceInEth: 0.025, img: nft1Image },
    { title: 'metagamer', priceInEth: 6.942, img: nft2Image },
  ];
  return (
    <PlayerBox title="Gallery" setRemoveBox={setRemoveBox}>
      {(fakeData || []).slice(0, show ? 999 : 3).map((nft) => (
        <HStack alignItems="end" mb={6}>
          <Flex width="126px" height="126px" mr={6}>
            <Box
              bgImage={`url(${nft.img})`}
              backgroundSize="contain"
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              width="124px"
              height="124px"
              m="auto"
            />
          </Flex>
          <Box>
            <Text
              fontSize="xs"
              fontFamily="heading"
              mt={3}
              mb={3}
              casing="uppercase"
            >
              {nft.title}
            </Text>
            <Text fontSize="sm" mb="1">
              {nft.priceInEth}Ξ ($
              {parseFloat(`${nft.priceInEth * fakeEthPrice}`).toFixed(2)})
            </Text>
          </Box>
        </HStack>
      ))}
      {(player.daohausMemberships || []).length > 3 && (
        <Text
          as="span"
          fontFamily="body"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={() => setShow(!show)}
        >
          View {show ? 'less' : 'all'}
        </Text>
      )}
    </PlayerBox>
  );
};
