import { Box, Text } from '@metafam/ds';
import React from 'react';
import { parse } from 'rss-to-json';

export const Listen: React.FC = () => {
  const getData = async () => {
    const podcastDataRss = await parse(
      'https://anchor.fm/s/57a641c/podcast/rss',
      {},
    );

    console.log('podcast data', podcastDataRss);
  };

  getData();

  return (
    <Box>
      <Text>A feed podcast episodes from Anchor or wherever.</Text>
    </Box>
  );
};
