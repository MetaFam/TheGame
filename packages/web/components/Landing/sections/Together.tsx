import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/together-background.png';

const Together: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="65rem"
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
      maxWidth="75rem"
      alignItems="center"
    >
      <Box
        fontSize="3rem"
        lineHeight="64px"
        fontWeight="normal"
        color="white"
        bgGradient=" linear-gradient(180deg, #FFFFFF 15.3%, #FD208A 85.41%);                    "
        bgClip="text"
        maxWidth="75rem"
        display="inline"
        pb="35px"
        pt="130px"
        textAlign="center"
      >
        <Text pb={{ base: '19px', md: '50px' }}>
          {' '}
          We are bringing together the people & building blocks aligned on the
          idea of creating a new kind of society.
        </Text>
        <Text pb={{ base: '19px', md: '50px' }}>
          {' '}
          One that is optimized for human wellbeing rather than profit.
        </Text>
        <Text pb={{ base: '19px', md: '50px' }}>
          One that revolves around solving problems & living well, in balance
          with nature.
        </Text>
      </Box>
    </Container>
  </Box>
);

export default Together;
