import { Box, Heading, LoadingState, Text } from '@metafam/ds';
import React, { useEffect, useState } from 'react';
import { parse } from 'rss-to-json';
import useSWR from 'swr';

export const Listen: React.FC = () => {
  const [items, setItems] = useState<
    Array<{
      title: string;
      src: string;
      showMore: boolean;
      description: string;
    }>
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR(
    'https://anchor.fm/s/57a641c/podcast/rss',
    parse,
  );

  if (error) {
    console.log(error);
    setIsLoading(false);
  }

  useEffect(() => {
    if (data) {
      data.items = data.items.map((item) => ({
        title: item.title,
        description: item.description.replace(/<\/?[^>]+(>|$)/g, ''),
        src: item.enclosures[0].url,
        showMore: false,
      }));

      setIsLoading(false);
    }
  }, [data]);

  const findAndReplace = (src: string) => {
    const foundIndex = items.findIndex((x) => x.src === src);
    items[foundIndex].showMore = !items[foundIndex].showMore;
    return items;
  };

  return (
    <Box pt={4}>
      {isLoading ? (
        <LoadingState />
      ) : (
        items.map((item) => (
          <Box
            key={item.title}
            mt={4}
            p={6}
            backgroundColor="blackAlpha.500"
            borderRadius="md"
          >
            <Heading size="xs" color="white" pb={4}>
              {item.title}
            </Heading>
            <Text
              textOverflow={item.showMore ? '' : 'ellipsis'}
              overflow={item.showMore ? '' : 'hidden'}
              whiteSpace={item.showMore ? 'normal' : 'nowrap'}
              fontSize="sm"
              cursor="pointer"
              color="white"
              onClick={() => setItems([...findAndReplace(item.src)])}
            >
              {item.description}
            </Text>
            <Text
              cursor="pointer"
              color="blueLight"
              pt={1}
              pb={1}
              fontWeight="bold"
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
        ))
      )}
    </Box>
  );
};
