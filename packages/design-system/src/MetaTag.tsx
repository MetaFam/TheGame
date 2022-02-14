import { Tag, TagProps } from '@chakra-ui/react';
import React from 'react';

export const MetaTag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ children, ...props }, ref) => (
    <Tag
      fontSize="sm"
      fontWeight="bold"
      backgroundColor="purpleTag"
      color="white"
      {...{ ref }}
      {...props}
    >
      {children}
    </Tag>
  ),
);
