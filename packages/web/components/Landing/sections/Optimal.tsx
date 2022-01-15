import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/optimal-background.png';

export const Optimal: React.FC = () => (
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
      textAlign="center"
    >
      <Box
        fontSize={{ base: '2rem', md: '3rem' }}
        lineHeight={{ base: '3rem', md: '4.5rem' }}
        fontWeight="normal"
        color="white"
        maxWidth="75rem"
      >
        <Text pt="8.125rem" pb="2.188rem" textAlign="center">
          To find your metagame means to{' '}
          <Text fontWeight="bold" color="cyanText">
            play life in the optimal way.
          </Text>
        </Text>
        <Box pb="2.188rem">
          <Text>
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
        </Box>
      </Box>
    </Container>
  </Box>
);
