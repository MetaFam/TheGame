import { Heading, Text } from '@chakra-ui/react';


export type TextProps = {
  children: React.ReactNode;
};

export const H1: React.FC<TextProps> = ({ children }) => (
  <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={4}>
    {children}
  </Heading>
);

export const P: React.FC<TextProps> = ({ children }) => <Text>{children}</Text>;
