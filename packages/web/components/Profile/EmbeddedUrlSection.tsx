import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  LoadingState,
  Text,
} from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import React, { useEffect, useRef, useState } from 'react';
import { BoxType } from 'utils/boxTypes';

const proxyLink = 'https://rlp-proxy.herokuapp.com/v2?url='; // TODO: deploy our own proxy (makes use of the Twitter API)

type EmbeddedUrlProps = {
  url?: string;
  canEdit?: boolean;
};

export const EmbeddedUrl: React.FC<EmbeddedUrlProps> = ({ url, canEdit }) => (
  <ProfileSection canEdit={canEdit} boxType={BoxType.EMBEDDED_URL} withoutBG>
    <LinkPreview
      className="linkPreview"
      height="100%"
      width="100%"
      customLoader={<LoadingState />}
      showLoader
      {...{ url, canEdit }}
    />
  </ProfileSection>
);

interface LinkPreviewProps {
  url?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  descriptionLength?: number;
  borderRadius?: string | number;
  textAlign?: 'left' | 'right' | 'center';
  margin?: string | number;
  fallback?: JSX.Element[] | JSX.Element | null;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  showLoader?: boolean;
  customLoader?: JSX.Element[] | JSX.Element | null;
  canEdit?: boolean;
}

interface APIResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  url = '',
  className = '',
  width,
  height,
  borderRadius = 'lg',
  textAlign,
  margin,
  fallback = null,
  secondaryTextColor = 'rgb(255,255,255)',
  showLoader = true,
  customLoader = null,
}) => {
  const isMounted = useRef(true);

  const [metadata, setMetadata] = useState<APIResponse | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;

    setLoading(true);
    fetch(proxyLink + url)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted.current) {
          setMetadata((res.metadata as unknown) as APIResponse);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.error('No metadata could be found for the given URL.', err);
        if (isMounted.current) {
          setMetadata(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  if (loading && showLoader) {
    if (customLoader) {
      return <Box py="2rem">{customLoader}</Box>;
    }
    return (
      <Box>
        <p>Loading...</p>
      </Box>
    );
  }

  if (!metadata) {
    return <>{fallback}</>;
  }

  const { image, description, title, siteName } = metadata;

  const onClick = () => {
    window.open(url, '_blank');
  };

  return (
    <LinkBox
      data-testid="container"
      onClick={onClick}
      className={`Container ${className}`}
      sx={{
        width,
        height,
        borderRadius,
        textAlign,
        margin,
        backdropFilter: 'blur(7px)',
        borderWidth: '0',
        overflow: 'hidden',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Flex w="100%" h="100%" direction="column">
        <Box
          data-testid="image-container"
          sx={{
            backgroundImage: `url(${image})`,
            height: 'auto',
            flex: 1,
            minH: '12rem',
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="Image"
        />
        <Box
          sx={{
            p: 4,
            h3: {
              fontSize: '14px',
              fontWeight: '900',
              a: {
                color: 'white',
              },
            },
          }}
        >
          <h3>
            <LinkOverlay href={url} isExternal>
              {title}
            </LinkOverlay>
          </h3>
          {description && (
            <Box
              data-testid="desc"
              className="Description Secondary"
              sx={{
                color: secondaryTextColor,
                fontSize: '12px',
                mt: 1,
              }}
            >
              <Text noOfLines={3}>{description}</Text>
            </Box>
          )}
          <Box
            className="Secondary SiteDetails"
            sx={{
              color: 'cyanText',
              fontSize: '12px',
              mt: 1,
            }}
          >
            {siteName && <span>{siteName} • </span>}
            <Text isTruncated>{url}</Text>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  );
};
