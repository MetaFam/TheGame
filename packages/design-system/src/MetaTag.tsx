import { Tag, TagProps } from '@chakra-ui/react';


export const MetaTag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ children, ...props }, ref) => (
    <Tag
      fontSize="xs"
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
