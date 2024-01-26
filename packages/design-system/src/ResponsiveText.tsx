import { Text, TextProps, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

interface Content {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[] | Record<string, any>;
}

export type Props = Content & Omit<TextProps, keyof Content>;

export const ResponsiveText: React.FC<Props> = ({ content, ...props }) => {
  const value = useBreakpointValue(content);
  return <Text {...props}>{value}</Text>;
};
