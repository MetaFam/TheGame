import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  LoadingState,
  Text,
} from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Maybe } from 'graphql/autogen/types';
import { useDelay } from 'lib/hooks/useDelay';
import React, { useCallback, useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

const metadataLink = '/api/metadata?url=';

type EmbeddedUrlProps = {
  url?: string;
  editing?: boolean;
};

export const EmbeddedUrl: React.FC<EmbeddedUrlProps> = ({ url, editing }) => (
  <ProfileSection
    {...{ editing }}
    type={BoxTypes.EMBEDDED_URL}
    pb={0}
    withoutBG
  >
    <LinkPreview {...{ url, editing }} />
  </ProfileSection>
);

interface LinkPreviewProps {
  url?: string;
  editing?: boolean;
}

interface URIMetadata {
  url?: Maybe<string>;
  title?: Maybe<string>;
  description?: Maybe<string>;
  image?: Maybe<string>;
  site_name?: Maybe<string>;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url: inputUrl = '' }) => {
  const [metadata, setMetadata] = useState<Maybe<URIMetadata>>(null);
  const [loading, setLoading] = useState(true);

  const updateMetadata = useCallback(async (uri: string) => {
    setLoading(true);
    try {
      const res = await fetch(metadataLink + uri);
      const { error, response } = await res.json();

      if (error) throw error;

      setMetadata((response.og as unknown) as URIMetadata);
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
      <Box
        minH="18rem"
        w="100%"
        h="100%"
        borderRadius="lg"
        backdropFilter="blur(7px)"
        borderWidth={0}
      >
        {loading && <LoadingState />}
      </Box>
    );
  }

  const { image, description, title, site_name: siteName, url } = metadata;

  return (
    <LinkBox
      minH="18rem"
      w="100%"
      h="100%"
      borderRadius="lg"
      backdropFilter="blur(7px)"
      borderWidth={0}
      overflow="hidden"
    >
      <Flex w="100%" h="100%" direction="column">
        <Box
          bgImage={image ? `url(${image})` : 'none'}
          height="auto"
          h="12rem"
          w="100%"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
        />
        <Box p={4}>
          <LinkOverlay href={url ?? inputUrl} isExternal>
            <Text fontSize="md" fontWeight="900" color="white">
              {title}
            </Text>
          </LinkOverlay>
          {description && (
            <Box mt={1}>
              <Text fontSize="sm" color="white" noOfLines={3}>
                {description}
              </Text>
            </Box>
          )}
          <Box mt={1} color="cyanText" fontSize="sm">
            {siteName && <Text as="span">{siteName} • </Text>}
            <Text isTruncated>{url}</Text>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  );
};
