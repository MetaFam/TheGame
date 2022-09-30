import { Box, Heading, LoadingState, Text } from '@metafam/ds';
import React, { useEffect, useState } from 'react';
import { parse } from 'rss-to-json';
import useSWR from 'swr';

import { podcastRSSURL } from '../config';

export type ContentItem = {
  title: string;
  src: string;
  showMore: boolean;
  description: string;
  html: string;
};

export const Listen: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Array<ContentItem>>([]);

  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(podcastRSSURL, parse);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Podcast fetch error: ', error);
    setLoading(false);
  }

  useEffect(() => {
    if (data) {
      data.items = data.items
        .filter((item) => item.enclosures)
        .map((item) => ({
          title: item.title,
          description: item.description.replace(/<\/?[^\s>][^>]*\/?>/gm, ''),
          html: item.description,
          src: item.enclosures[0].url,
          showMore: false,
        }));

      setPodcasts(data.items);

      setLoading(false);
    }
  }, [data]);

  const toggleVisibility = ({
    items,
    src,
  }: {
    items: ContentItem[];
    src: string;
  }) => {
    const itemsCopy = [...items];
    const index = items.findIndex((item) => item.src === src);
    itemsCopy[index].showMore = !items[index].showMore;
    return itemsCopy;
  };

  return (
    <Box pr={3}>
      {loading ? (
        <LoadingState />
      ) : (
        podcasts.map((podcast) => (
          <Box
            key={podcast.title}
            mt={4}
            p={6}
            backgroundColor="blackAlpha.500"
            borderRadius="md"
          >
            <Heading size="xs" color="white" pb={4}>
              {podcast.title}
            </Heading>
            {podcast.showMore ? (
              <Box
                fontSize="sm"
                color="white"
                dangerouslySetInnerHTML={{
                  __html: podcast.html,
                }}
              />
            ) : (
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                fontSize="sm"
                cursor="pointer"
                color="white"
                onClick={() =>
                  setPodcasts((items) =>
                    toggleVisibility({
                      items,
                      src: podcast.src,
                    }),
                  )
                }
              >
                {podcast.description}
              </Text>
            )}

            <Text
              cursor="pointer"
              color="blueLight"
              py={1}
              fontWeight="bold"
              onClick={() =>
                setPodcasts((items) =>
                  toggleVisibility({
                    items,
                    src: podcast.src,
                  }),
                )
              }
            >
              {podcast.showMore ? 'Show less' : 'Show more'}
            </Text>
            <audio
              style={{
                width: '100%',
                marginTop: 8,
                height: 24,
              }}
              controls
            >
              <source src={podcast.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        ))
      )}
    </Box>
  );
};
