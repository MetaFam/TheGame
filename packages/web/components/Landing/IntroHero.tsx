import { Button, Heading, Stack, Text } from '@metafam/ds';
// import { animated } from '@react-spring/web';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';

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
      spacing={{ base: 8, xl: 4, '2xl': 10 }}
      pb={{ base: 10, xl: 15, '2xl': 10 }}
      direction={{ base: 'column', lg: 'column' }}
      maxW="lg"
      zIndex={100}
      transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
    >
      <Heading
        as="h1"
        fontFamily="body"
        fontSize={{ base: '5xl', md: '7xl', xl: '5xl', '2xl': '7xl' }}
        fontWeight="300"
        color="white"
      >
        <Text as="span">MetaGame</Text>
      </Heading>

      <Text
        as="p"
        className="gradient"
        fontSize={{ base: 'md', md: '2xl', xl: 'xl', '2xl': '3xl' }}
      >
        A Massive Online Coordination Game
      </Text>

      <Stack
        pt={{ base: 0, xl: 5, '2xl': 0 }}
        spacing={{ base: 4, sm: 6 }}
        justifyContent="space-evenly"
        direction={{ base: 'column', sm: 'row' }}
        transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.6s ease-in-out, opacity 0.5s 0.7s ease-in"
      >
        <Button
          className="border-grad"
          rounded="md"
          size="lg"
          onClick={() => handleSectionNav('wtf-is-a-metagame')}
        >
          <Text as="span">Explore</Text>
        </Button>
      </Stack>
    </Stack>
  );
};
