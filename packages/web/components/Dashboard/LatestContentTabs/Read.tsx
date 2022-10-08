import { Box, Heading, Image, Link, LoadingState, Text } from '@metafam/ds';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Read: React.FC = () => {
  const { data, error } = useSWR('/api/feed', fetcher);
  return (
    <Box px={2} pl={0}>
      {data && data.response ? (
        data.response.items?.map(
          (item: {
            title: string;
            description: string;
            link: string;
            enclosures: Record<string, string>[];
          }) => (
            <Box
              key={item.title}
              position="relative"
              mt={4}
              backgroundColor="blackAlpha.500"
              borderRadius="md"
              overflow="hidden"
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'blackAlpha.700',
                  zIndex: 1,
                },
              }}
            >
              <Box position="relative" zIndex={5} p={6}>
                <Heading size="xs" color="white" fontWeight="normal" pb={4}>
                  {item.title}
                </Heading>
                <Text dangerouslySetInnerHTML={{ __html: item.description }} />
                <Link
                  href={item.link}
                  _hover={{ bg: 'none', textDecoration: 'none' }}
                  _focus={{ outline: 'none' }}
                >
                  <Text
                    cursor="pointer"
                    color="blueLight"
                    py={1}
                    fontWeight="bold"
                  >
                    Read Here
                  </Text>
                </Link>
              </Box>
              {item.enclosures &&
                item.enclosures.length > 0 &&
                item.enclosures[0].type === 'image/jpeg' && (
                  <Box
                    position="absolute"
                    inset={0}
                    width="full"
                    height="full"
                    bg="landingDarkGlass"
                    bgImg={`url(${item.enclosures[0].url})`}
                    bgSize="cover"
                    opacity={0.2}
                    zIndex={0}
                  />
                )}
            </Box>
          ),
        )
      ) : (
        <>
          {!data && <LoadingState />}
          {(error || (data && data.error)) && <Text>Something Went Wrong</Text>}
        </>
      )}
    </Box>
  );
};
