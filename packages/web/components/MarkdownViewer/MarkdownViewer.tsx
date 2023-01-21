/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Spacer,
  Table,
  Text,
  Th,
} from '@metafam/ds';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { MetaLink } from 'components/Link';
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const heading: Components['h1'] = (props) => {
  const { level } = props;
  const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  return (
    <Heading
      my={4}
      as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
      size={sizes[level - 1]}
      fontFamily="body"
      {...props}
    />
  );
};

const markdownTheme: Components = {
  a: ({ href, ...props }) => (
    <MetaLink color="cyan" isExternal href={href ?? '#'} {...props} />
  ),
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
  hr: () => <Divider borderBottomWidth="4px" my={2} />,
  blockquote: ({ children }) => (
    <Box
      w="full"
      as="blockquote"
      p={2}
      pb="1px"
      borderLeft="4px solid"
      borderColor="inherit"
      my={2}
    >
      {children}
    </Box>
  ),
  table: (props) => <Table w="auto" {...props} />,
  th: ({ children }) => <Th fontFamily="body">{children}</Th>,
  br: () => <Spacer />,
  img: (props) => <Image w="full" {...props} />,
  p: ({ children, ...props }) => (
    <Text mb={2} {...props}>
      {children}
    </Text>
  ),
  code: ({ inline, ...props }) => {
    if (inline) {
      return <Code {...props} />;
    }

    return (
      <Code
        whiteSpace="break-spaces"
        display="block"
        w="full"
        px={4}
        py={2}
        my={2}
        {...props}
      />
    );
  },
};

type MarkdownViewerProps = { children: string };

const Viewer: React.FC<MarkdownViewerProps> = ({ children }) => (
  <Box w="full" color="white">
    <ReactMarkdown
      components={{ ...ChakraUIRenderer(), ...markdownTheme }}
      remarkPlugins={[remarkGfm]}
      skipHtml
    >
      {children}
    </ReactMarkdown>
  </Box>
);

export default Viewer;
