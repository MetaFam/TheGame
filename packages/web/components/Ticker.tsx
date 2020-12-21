import { Flex, Heading, Image } from '@metafam/ds';
import MetaGameLogo from 'assets/logo.png';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

export const Ticker: React.FC = () => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=metagame&vs_currencies=usd`,
    )
      .then((response) => response.json())
      .then((data) => setPrice(data.metagame.usd));
  }, [price, setPrice]);

  return (
    <Flex
      alignItems="center"
      margin="15px"
      display={price > 0 ? 'flex' : 'none'}
    >
      <Image
        src={MetaGameLogo}
        alt="MetaGameLogo"
        objectFit="contain"
        boxSize="2rem"
        margin="0 15px 0 0"
      />
      <Heading size="xs" color="white" margin="0 15px 0 0">
        SEED ${price.toFixed(2)}
      </Heading>
    </Flex>
  );
};
