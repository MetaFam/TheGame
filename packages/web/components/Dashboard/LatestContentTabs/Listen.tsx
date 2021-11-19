import { Box, Button, Heading, Text } from '@metafam/ds';
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
        <Box>
          <Heading size="xs" color="white">
            {item.title}
          </Heading>
          <Text>
            {item.showMore
              ? item.description
              : `${item.description.substring(0, 250)}`}
          </Text>
          <Text
            cursor="pointer"
            color="white"
            onClick={() => setItems([...findAndReplace(item.src)])}
          >
            Show more
          </Text>
          {/* <audio ref="audio_tag" src="./static/music/foo.mp3" controls autoPlay/> */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            style={{
              width: '100%',
              height: 24,
            }}
            controls
          >
            <source src={item.src} type="audio/mp3" />
            {/* <track
              src="captions_en.vtt"
              kind="captions"
              label="english_captions"
            /> */}
            Your browser does not support the audio element.
          </audio>
        </Box>
      ))}

      <Text>A feed podcast episodes from Anchor or wherever.</Text>
    </Box>
  );
};
