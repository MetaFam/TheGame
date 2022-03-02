import { Button, Heading, Stack, Text } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const IntroHero: React.FC = () => {
  const { push } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(heroRef);

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Stack
      ref={heroRef}
      pos="relative"
      align="center"
      justify="left"
      spacing={8}
      pb={10}
      direction={{ base: 'column', lg: 'column' }}
      maxW="lg"
      zIndex={100}
      transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
    >
      <Heading
        fontFamily="body"
        fontSize={{ base: '5xl', md: '7xl' }}
        fontWeight="300"
        color="white"
        textAlign="center"
      >
        MetaGame
      </Heading>

      <Text
        className="gradient"
        fontSize={{ base: 'md', md: '2xl' }}
        textAlign="center"
      >
        A Massive Online Coordination Game
      </Text>

      <Stack
        spacing={{ base: 4, md: 8 }}
        justifyContent="space-evenly"
        direction={{ base: 'column', sm: 'row' }}
        transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
      >
        <MetaLink _hover={{}} href="/join">
          <Button
            className="border-grad"
            colorScheme="white"
            rounded="md"
            size="lg"
          >
            Start Playing
          </Button>
        </MetaLink>
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('wtf-is-a-metagame')}
        >
          Explore
        </Button>
      </Stack>
    </Stack>
  );
};
