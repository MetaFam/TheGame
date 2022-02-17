import { ListItem, OrderedList, Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/whatWeDo-background.png';
import { FullPageContainer } from 'components/Container';

export const WhatWeDo: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem' }}
      spacing={{ base: 4, md: 8 }}
      align="stretch"
    >
      <Text fontWeight="bold">What are we doing?</Text>
      <OrderedList opacity="0.8">
        <ListItem>Curating knowledge </ListItem>
        <ListItem>Organizing events</ListItem>
        <ListItem>Producing content</ListItem>
        <ListItem>Building technologies</ListItem>
        <ListItem>Uniting aligned people & communities </ListItem>
        <ListItem>Putting together the pieces of the New World puzzle</ListItem>
      </OrderedList>

      <Text fontWeight="bold">
        In short, anything & everything related to DAOs & helping people build
        the future they want to live in
      </Text>
    </VStack>
  </FullPageContainer>
);
