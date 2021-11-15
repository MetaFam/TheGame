import 'react-h5-audio-player/lib/styles.css';

import { Box, Heading, Text } from '@metafam/ds';
import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { parse } from 'rss-to-json';

export const Listen: React.FC = () => {
  const [items, setItems] = useState([]);

  const getData = async () => {
    const podcastDataRss = await parse(
      'https://anchor.fm/s/57a641c/podcast/rss',
      {},
    );

    console.log('podcast data', podcastDataRss);
    setItems(podcastDataRss.items);
    console.log('items', items);
  };

  if (items.length === 0) getData();
  console.log('items', items);

  return (
    <Box>
      {items.map((item) => (
        <Box>
          <Heading size="xs" color="white">
            {item.title}
          </Heading>
          <Text>{item.description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
          <AudioPlayer
            // autoPlay
            preload="none"
            src={item.enclosures[0].url}
            onPlay={(e) => console.log('onPlay')}
            // other props here
          />
        </Box>
      ))}

      <Text>A feed podcast episodes from Anchor or wherever.</Text>
    </Box>
  );
};
