import { Box, Container, ListItem, OrderedList, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/whatWeDo-background.png';

export const WhatWeDo: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="100%"
    backgroundImage={`url(${BackgroundImage})`}
    bgPosition="center"
    bgSize="cover"
  >
    <Container
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth="100%"
      alignItems="center"
    >
      <Box
        fontSize={{ base: '1.5rem', md: '3rem' }}
        lineHeight={{ base: '2.25rem', md: '4rem' }}
        maxWidth="62.438rem"
      >
        <Text pt="8.125rem" pb="2.188rem" fontWeight="700">
          What are we doing?
        </Text>
        <OrderedList pb="2.188rem" fontWeight="300" opacity="0.8">
          <ListItem>Curating knowledge </ListItem>
          <ListItem>Organizing events</ListItem>
          <ListItem>Producing content</ListItem>
          <ListItem>Building technologies</ListItem>
          <ListItem>Uniting aligned people & communities </ListItem>
          <ListItem>
            Putting together the pieces of the New World puzzle
          </ListItem>
        </OrderedList>

        <Text fontWeight="700" width="100%">
          In short, anything & everything related to DAOs & helping people build
          the future they want to live in
        </Text>
      </Box>
    </Container>
  </Box>
);
