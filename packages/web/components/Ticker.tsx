import { Heading, VStack } from '@metafam/ds';
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
    <VStack my="4">
      <Heading size="xs" fontFamily="mono" color="purple.200">
        $SEED PRICE
      </Heading>
      <Heading size="xs">${price ? price.toFixed(2) : '$--.--'}</Heading>
    </VStack>
  );
};
