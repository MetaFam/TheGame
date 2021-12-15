import { Box, Heading, Link, LoadingState, Text } from '@metafam/ds';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Read: React.FC = () => {
  const { data, error } = useSWR('/api/feed', fetcher);
  return (
    <Box pt={4}>
      {data && data.response ? (
        data.response.items?.map((item: any) => (
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
          {error || (data?.error && <Text>Something Went Wrong</Text>)}
        </>
      )}
    </Box>
  );
};
