import 'react-h5-audio-player/lib/styles.css';

import { Box, Button, Heading, Text } from '@metafam/ds';
import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { parse } from 'rss-to-json';

export const Listen: React.FC = () => {
  const [items, setItems] = useState<
    Array<{
      title: string;
      src: string;
      showMore: boolean;
      description: string;
    }>
  >([]);

  const getData = async () => {
    const podcastDataRss = await parse(
      'https://anchor.fm/s/57a641c/podcast/rss',
      {},
    );

    const preparedData = podcastDataRss.items.map((item) => ({
      title: item.title,
      description: item.description.replace(/<\/?[^>]+(>|$)/g, ''),
      src: item.enclosures[0].url,
      showMore: false,
    }));
    setItems(preparedData);
  };

  const findAndReplace = (src: string) => {
    const foundIndex = items.findIndex((x) => x.src === src);
    items[foundIndex].showMore = !items[foundIndex].showMore;
    return items;
  };

  if (items.length === 0) getData();

  return (
    <Box>
      {items.map((item) => (
        <Box>
          <AudioPlayer
            // autoPlay
            header={
              <Heading size="xs" color="black">
                {item.title}
              </Heading>
            }
            footer={
              <Box>
                <Text>
                  {item.showMore
                    ? item.description
                    : `${item.description.substring(0, 250)}`}
                </Text>
                <Button onClick={() => setItems([...findAndReplace(item.src)])}>
                  Show more
                </Button>
              </Box>
            }
            preload="none"
            src={item.src}
            // other props here
          />
        </Box>
      ))}

      <Text>A feed podcast episodes from Anchor or wherever.</Text>
    </Box>
  );
};
