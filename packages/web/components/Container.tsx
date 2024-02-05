import { Box, Flex, FlexProps, Stack, StackProps } from '@metafam/ds';
import { HeadComponent } from 'components/Seo';

const PageContainer: React.FC<FlexProps> = ({ children, ...props }) => (
  <Box
    as={Flex}
    className="full-page-container"
    w="100%"
    h="100%"
    p={{ base: 3, sm: 8, lg: 12 }}
    direction="column"
    align="center"
    pos="relative"
    bgImage={''}
    {...props}
  >
    {children}
  </Box>
);

export default PageContainer;

export const FlexContainer: React.FC<StackProps> = ({ children, ...props }) => (
  <Box
    as={Stack}
    className="flex-container"
    w="full"
    align="center"
    justify="center"
    spacing={[6, 8]}
    {...props}
  >
    {children}
  </Box>
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
  <Box as={Flex} w="100%" h="100%" direction="column" {...props}>
    <HeadComponent title={title} description={description} url={url} />
    <iframe
      title={title}
      src={url}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </Box>
);

export const FullPageContainer: React.FC<
  StackProps & { bgImageUrl?: string }
> = ({ bgImageUrl, sx, children, ...props }) => (
  <FlexContainer
    className="full-page-container"
    minH="100vh"
    bg="dark"
    bgImage={bgImageUrl && `url(${bgImageUrl})`}
    bgPosition="center"
    bgAttachment="fixed"
    bgSize="cover"
    overflowX="hidden"
    spacing={0}
    zIndex={1}
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
