import { Text, VStack } from '@metafam/ds';
import BackgroundImage from 'assets/landing/optimal-background.png';
import { FullPageContainer } from 'components/Container';

export const Optimal: React.FC = () => (
  <FullPageContainer bgImageUrl={BackgroundImage}>
    <VStack
      fontSize={{ base: 'xl', md: '5xl' }}
      color="white"
      maxWidth={{ base: '16rem', md: '32rem', lg: '64rem' }}
      spacing={8}
      align="stretch"
    >
      <Text textAlign="center">
        To find your metagame means to{' '}
        <Text as="span" fontWeight="bold" color="cyanText">
          play life in the optimal way.
        </Text>
      </Text>
      <Text textAlign="center">
        By coordinating with others on building a better world; doing things
        that create a{' '}
        <Text as="span" fontWeight="bold" color="cyanText">
          {' '}
          a positive impact
          <br />{' '}
        </Text>{' '}
        make
        <Text as="span" fontWeight="bold" color="cyanText">
          {' '}
          you happy{' '}
        </Text>
        AND
        <Text as="span" fontWeight="bold" color="cyanText">
          {' '}
          earn you money.
        </Text>
      </Text>
    </VStack>
  </FullPageContainer>
);
