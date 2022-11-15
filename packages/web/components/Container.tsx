import { Flex, FlexProps, Stack, StackProps } from '@metafam/ds';
import { HeadComponent } from 'components/Seo';
import React from 'react';

export const PageContainer: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    w="100%"
    h="100%"
    p={{ base: 3, sm: 8, lg: 12 }}
    direction="column"
    align="center"
    pos="relative"
    {...props}
  >
    {children}
  </Flex>
);

export const FlexContainer: React.FC<StackProps> = ({ children, ...props }) => (
  <Stack w="full" align="center" justify="center" spacing={[6, 8]} {...props}>
    {children}
  </Stack>
);

type EmbedProps = {
  title: string;
  description: string;
  url: string;
} & FlexProps;

export const EmbedContainer: React.FC<EmbedProps> = ({
  title,
  description,
  url,
  ...props
}) => (
  <Flex w="100%" h="100%" direction="column" {...props}>
    <HeadComponent title={title} description={description} url={url} />
    <iframe
      title={title}
      src={url}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </Flex>
);

export const FullPageContainer: React.FC<
  StackProps & { bgImageUrl?: string }
> = ({ bgImageUrl, sx, children, ...props }) => (
  <FlexContainer
    minH="100vh"
    bg="dark"
    bgImage={bgImageUrl && `url(${bgImageUrl})`}
    bgPosition="center"
    bgAttachment="fixed"
    bgSize="cover"
    spacing={0}
    p={{ base: 4, md: 8, lg: 12 }}
    sx={{
      scrollSnapAlign: 'start',
      scrollSnapStop: 'normal',
      ...sx,
    }}
    {...props}
  >
    {children}
  </FlexContainer>
);
