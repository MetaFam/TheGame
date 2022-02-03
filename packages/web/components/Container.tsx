import { Flex, FlexProps, Stack, StackProps } from '@metafam/ds';
import { HeadComponent } from 'components/Seo';

export const PageContainer: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    w="100%"
    h="100%"
    p={{ base: 8, lg: 12 }}
    direction="column"
    align="center"
    pos="relative"
    {...props}
  >
    {children}
  </Flex>
);

export const FlexContainer: React.FC<StackProps> = ({ children, ...props }) => (
  <Stack
    w="100%"
    align="center"
    justify="center"
    direction="column"
    spacing={8}
    {...props}
  >
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
