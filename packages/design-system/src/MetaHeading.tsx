import { Heading, HeadingProps } from '@chakra-ui/react';


export const MetaHeading: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading
    size="2xl"
    textAlign="center"
    fontWeight="600"
    fontFamily="body"
    {...props}
  >
    {children}
  </Heading>
);
