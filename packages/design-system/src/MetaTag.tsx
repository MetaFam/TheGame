import { Tag, TagProps } from '@chakra-ui/react';
import React from 'react';

export const MetaTag: React.FC<TagProps> = React.forwardRef<HTMLSpanElement>(
  ({ children, ...props }, ref) => (
    <Tag
      fontSize="sm"
      fontWeight="bold"
      backgroundColor="purpleTag"
      color="white"
      ref={ref}
      {...props}
    >
      {children}
    </Tag>
  ),
);
