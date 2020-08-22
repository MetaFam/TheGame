import { Text, TextProps, useBreakpointValue } from '@chakra-ui/core';
import React from 'react';

interface Content {
  content: any[] | Record<string, any>;
}

export type Props = Content & TextProps;

export const ResponsiveText: React.FC<Props> = ({ content, ...props }) => {
  const value = useBreakpointValue(content);
  return <Text {...props}>{value}</Text>;
};
