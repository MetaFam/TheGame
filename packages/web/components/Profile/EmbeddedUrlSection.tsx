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
import { BoxType } from 'utils/boxTypes';

const metadataLink = '/api/metadata?url=';

type EmbeddedUrlProps = {
  url?: string;
  canEdit?: boolean;
};

export const EmbeddedUrl: React.FC<EmbeddedUrlProps> = ({ url, canEdit }) => (
  <ProfileSection
    canEdit={canEdit}
    boxType={BoxType.EMBEDDED_URL}
    pb={0}
    withoutBG
  >
    <LinkPreview {...{ url, canEdit }} />
  </ProfileSection>
);

interface LinkPreviewProps {
  url?: string;
  canEdit?: boolean;
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

  const updateMetadata = useCallback((uri: string) => {
    setLoading(true);
    fetch(metadataLink + uri)
      .then((res) => res.json())
      .then(({ error, response }) => {
        if (error) throw error;
        setMetadata((response.og as unknown) as URIMetadata);
        setLoading(false);
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.error('No metadata could be found for the given URL.', err);
        setMetadata(null);
        setLoading(false);
      });
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
      onClick={() => window.open(url ?? inputUrl, '_blank')}
      minH="18rem"
      w="100%"
      h="100%"
      borderRadius="lg"
      backdropFilter="blur(7px)"
      borderWidth={0}
      overflow="hidden"
      _hover={{
        cursor: 'pointer',
      }}
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
            {siteName && <span>{siteName} • </span>}
            <Text isTruncated>{url}</Text>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  );
};
