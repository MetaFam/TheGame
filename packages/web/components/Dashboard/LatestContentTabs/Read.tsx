import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Link,
  LoadingState,
  Text,
} from '@metafam/ds';
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
          }) => {
            const image = item.enclosures[0].url;
            const resizedImage = image.replace(/\/h_[0-9]{2,}/gi, '/h_250'); // resize image to 250px height
            const shortenedDescription = `${item?.description?.replace(/^(.{125}[^\s]*).*/, "$1")}...`;
            return (
              <AspectRatio
                key={item.title}
                ratio={16 / 9}
                mt={4}
                role="group"
                position="relative"
                backgroundColor="blackAlpha.500"
                borderRadius="md"
                overflow="hidden"
              >
                <Box
                  backgroundColor="blackAlpha.600"
                  borderRadius="md"
                  w="100%"
                  h="100%"
                  overflow="hidden"
                >
                  <Box position="relative" zIndex={5} p={6}>
                    <Heading
                      size="xs"
                      color="white"
                      fontWeight="normal"
                      pb={4}
                      transition="all 0.2s ease-out"
                      _groupHover={{
                        transform: 'translateY(-20px)',
                        opacity: 0,
                      }}
                    >
                      {item.title}
                    </Heading>
                    <Text
                      dangerouslySetInnerHTML={{ __html: shortenedDescription }}
                      transition="all 0.2s ease-out"
                      _groupHover={{
                        transform: 'translateY(20px)',
                        opacity: 0,
                      }}
                    />
                    <Link
                      display="inline-flex"
                      href={item.link}
                      px={2}
                      _hover={{
                        bg: 'landingDarkGlass',
                        textDecoration: 'none',
                      }}
                      _focus={{ outline: 'none' }}
                      _groupHover={{
                        bg: 'landingDarkGlass',
                        textDecoration: 'none',
                      }}
                      borderRadius="md"
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
                        opacity={0.2}
                        zIndex={0}
                        transition="opacity 0.3s 0.1s ease-out"
                        _groupHover={{ opacity: 1 }}
                        sx={{
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            inset: 0,
                            zIndex: 2,
                            borderRadius: 'md',
                            transition: 'all 0.1s ease-out',
                            boxShadow: '0 0 50px rgba(0, 0, 0, 0.9) inset',
                          },
                        }}
                      >
                        <Image
                          src={resizedImage}
                          alt={item.title}
                          width="full"
                          height="full"
                          objectFit="cover"
                          loading="lazy"
                          zIndex={0}
                        />
                      </Box>
                    )}
                </Box>
              </AspectRatio>
            );
          },
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
