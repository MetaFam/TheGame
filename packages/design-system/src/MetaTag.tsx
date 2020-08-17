import { Tag, TagProps } from '@chakra-ui/core';
import React from 'react';

export const MetaTag: React.FC<TagProps> = ({ children, ...props }) => (
  <Tag
    fontFamily="body"
    fontSize="sm"
    fontWeight="bold"
    backgroundColor="purpleTag"
    color="white"
    {...props}
  >
    {children}
  </Tag>
);
