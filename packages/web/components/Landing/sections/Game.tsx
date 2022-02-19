import { Box, Container, Link, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/game-background.png';

export const Game: React.FC = () => (
  <Box
    id="about"
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
      pl={{ base: '0', md: '8.563rem' }}
    >
      <Text
        fontSize={{ base: '1.5rem', md: '2.375rem' }}
        lineHeight="3.5rem"
        fontWeight="normal"
        color="white"
        display="flex"
        flexDirection="column"
        maxWidth="32.75rem"
      >
        “Metagame is any approach to a game that transcends or operates outside
        of the prescribed rules of the game, uses external factors to affect the
        game, or goes beyond the supposed limits or environment set by the
        game.”
        <Text textAlign="right">
          - From{' '}
          <Link
            color="#79F8FB"
            href="#"
            fontSize="2.375rem"
            lineHeight="3.5rem"
            fontWeight="normal"
          >
            The Wiki
          </Link>
        </Text>
      </Text>
    </Container>
  </Box>
);
