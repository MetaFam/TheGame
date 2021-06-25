import { LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Box } from '@metafam/ds';
import React, { useEffect, useRef, useState } from 'react';

import { MetaLink } from './Link';

const proxyLink = 'https://rlp-proxy.herokuapp.com/v2?url='; // TODO: deploy our own proxy (makes use of the Twitter API)

export const tempUrl = 'https://github.com/MetaFam/TheGame';

export type EmbeddedUrlProps = {
  address?: string;
};

export const EmbeddedUrl: React.FC<EmbeddedUrlProps> = ({ address }) => (
  <Box>
    <LinkPreview
      url={address}
      className="linkPreview"
      height="auto"
      width="100%"
      backgroundColor="whiteAlpha.200"
      showLoader
    />
  </Box>
);

export interface LinkPreviewProps {
  url?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  descriptionLength?: number;
  borderRadius?: string | number;
  imageHeight?: string | number;
  textAlign?: 'left' | 'right' | 'center';
  margin?: string | number;
  fallback?: JSX.Element[] | JSX.Element | null;
  backgroundColor?: string;
  backgroundColorHover?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  showLoader?: boolean;
  customLoader?: JSX.Element[] | JSX.Element | null;
}

export interface APIResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url = '',
  className = '',
  width,
  height,
  borderRadius = 'lg',
  imageHeight = '20vh',
  textAlign,
  margin,
  fallback = null,
  backgroundColor = 'whiteAlpha.200',
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
        console.error(err);
        console.error('No metadata could be found for the given URL.');
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
      return <>{customLoader}</>;
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
        backgroundColor,
        backdropFilter: 'blur(7px)',
        borderWidth: '0',
        boxShadow: 'md',
        overflow: 'hidden',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        data-testid="image-container"
        sx={{
          backgroundImage: `url(${image})`,
          height: imageHeight,
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
          <MetaLink href={url} passHref isExternal>
            <LinkOverlay>{title}</LinkOverlay>
          </MetaLink>
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
    </LinkBox>
  );
};
