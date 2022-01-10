import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/optimal-background.png';

const Optimal: React.FC = () => (
  <Box
    width="100%"
    minHeight="1040px"
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
        fontSize="48px"
        lineHeight="72px"
        fontWeight="normal"
        color="white"
        maxWidth="1200px"
      >
        <Text pt="130px" pb="35px" textAlign="center">
          To find your metagame means to{' '}
          <Text fontWeight="bold" color="#79F8FB">
            play life in the optimal way.
          </Text>
        </Text>
        <Box pb="35px">
          <Text>
            By coordinating with others on building a better world; doing things
            that create a{' '}
            <Text as="span" fontWeight="bold" color="#79F8FB">
              {' '}
              a positive impact
              <br />{' '}
            </Text>{' '}
            make
            <Text as="span" fontWeight="bold" color="#79F8FB">
              {' '}
              you happy{' '}
            </Text>
            AND
            <Text as="span" fontWeight="bold" color="#79F8FB">
              {' '}
              earn you money.
            </Text>
          </Text>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Optimal;
