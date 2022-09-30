import {
  Box,
  Flex,
  HStack,
  Input,
  LoadingState,
  Text,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { Maybe } from 'graphql/autogen/types';
import { useDelay } from 'lib/hooks/useDelay';
import React, { useCallback, useEffect, useState } from 'react';
import { BoxMetadata } from 'utils/boxTypes';

const metadataLink = '/api/metadata?url=';

type EmbeddedUrlProps = {
  url?: string;
};

interface URIMetadata {
  url?: Maybe<string>;
  title?: Maybe<string>;
  description?: Maybe<string>;
  image?: Maybe<string>;
  site_name?: Maybe<string>;
}

export const EmbeddedUrl: React.FC<EmbeddedUrlProps> = ({
  url: inputUrl = '',
}) => {
  const [metadata, setMetadata] = useState<Maybe<URIMetadata>>(null);
  const [loading, setLoading] = useState(true);

  const updateMetadata = useCallback(async (uri: string) => {
    setLoading(true);
    try {
      const res = await fetch(metadataLink + uri);
      const { error, response } = await res.json();

      if (error) throw error;

      setMetadata(response.og as unknown as URIMetadata);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`No metadata found for the URL: ${uri}.`, err);
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const delayedUpdate = useDelay(updateMetadata);

  useEffect(() => delayedUpdate(inputUrl), [inputUrl, delayedUpdate]);

  if (!metadata || loading) {
    return (
      <Flex
        minH="21rem"
        w="100%"
        borderRadius="lg"
        backdropFilter="blur(7px)"
        borderWidth={0}
        justify="center"
        align="center"
      >
        {loading && <LoadingState />}
      </Flex>
    );
  }

  const { image, description, title, site_name: siteName, url } = metadata;

  return (
    <MetaLink
      _hover={{}}
      href={url ?? inputUrl}
      isExternal
      w="100%"
      borderRadius="lg"
      backdropFilter="blur(7px)"
      borderWidth={0}
      minH="21rem"
    >
      <Flex w="100%" direction="column">
        {image && (
          <Box
            bgImage={`url(${image})`}
            height="auto"
            minH="12rem"
            w="100%"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
        )}
        <VStack p={4} spacing={1} align="stretch">
          {title && (
            <Text
              as="span"
              fontWeight="bold"
              display="-webkit-box"
              textOverflow="ellipsis"
              overflow="hidden"
              maxW="calc(100%)"
              color="white"
              minH="1.5rem"
              sx={{
                lineClamp: 1,
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              minH="4rem"
              as="span"
              display="-webkit-box"
              textOverflow="ellipsis"
              overflow="hidden"
              maxW="calc(100%)"
              fontSize="sm"
              color="white"
              sx={{
                lineClamp: 3,
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </Text>
          )}
          <HStack spacing={1} minH="1.5rem">
            {siteName && (
              <Text
                as="span"
                color="cyanText"
                fontSize="sm"
                whiteSpace="nowrap"
              >
                {siteName} •
              </Text>
            )}
            <Text as="span" isTruncated fontSize="sm" pb={0}>
              {url ?? inputUrl}
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </MetaLink>
  );
};

export const EmbeddedUrlMetadata: React.FC<{
  metadata: BoxMetadata;
  setMetadata: (d: BoxMetadata) => void;
}> = ({ metadata, setMetadata }) => (
  <Input
    bg="dark"
    w="100%"
    placeholder="Provide the URL of the content"
    _placeholder={{ color: 'whiteAlpha.500' }}
    value={metadata.url ?? ''}
    onChange={({ target: { value: url } }) => setMetadata({ url })}
    size="lg"
    borderRadius={0}
    borderColor="borderPurple"
    fontSize="md"
    borderWidth="2px"
  />
);
