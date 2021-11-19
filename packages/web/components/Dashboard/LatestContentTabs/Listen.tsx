import { Box, Heading, Text } from '@metafam/ds';
import React, { useState } from 'react';
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
        <Box
          key={item.title}
          mb={4}
          mt={4}
          p={6}
          backgroundColor="blackAlpha.500"
          borderRadius="md"
        >
          <Heading size="xs" color="white" mb={2}>
            {item.title}
          </Heading>
          <Text
            textOverflow={item.showMore ? '' : 'ellipsis'}
            overflow={item.showMore ? '' : 'hidden'}
            whiteSpace={item.showMore ? 'normal' : 'nowrap'}
          >
            {item.description}
          </Text>
          <Text
            cursor="pointer"
            color="white"
            onClick={() => setItems([...findAndReplace(item.src)])}
          >
            {item.showMore ? 'Show less' : 'Show more'}
          </Text>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            style={{
              width: '100%',
              marginTop: 8,
              height: 24,
            }}
            controls
          >
            <source src={item.src} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      ))}
    </Box>
  );
};
