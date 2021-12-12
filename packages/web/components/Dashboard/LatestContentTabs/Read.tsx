import { Box, Heading, Link, LoadingState, Text } from '@metafam/ds';
import React, { useEffect, useState } from 'react';
import { parse } from 'rss-to-json';
import useSWR from 'swr';

export const Read: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const { data, error } = useSWR(url, parse);

  useEffect(() => setUrl(`${window.location.origin}/metagame/feed`), []);

  return (
    <Box pt={4}>
      {data ? (
        data.items?.map((item) => (
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
            <Text>{item.description}</Text>
            <Link
              href={item.link}
              _hover={{ bg: 'none', textDecoration: 'none' }}
              _focus={{ outline: 'none' }}
            >
              <Text cursor="pointer" color="blueLight" py={1} fontWeight="bold">
                Read Here
              </Text>
            </Link>
          </Box>
        ))
      ) : (
        <>
          {!error && <LoadingState />}
          {error && <Text>Something Went Wrong</Text>}
        </>
      )}
    </Box>
  );
};
