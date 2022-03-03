import { Button, Container, Heading, Stack, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { FullPageContainer } from 'components/Container';
import { StartButton } from 'components/Landing/StartButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Intro: React.FC<{ currentSection: number }> = ({
  currentSection,
}) => {
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    setTimeout(() => setOnScreen(currentSection === 0), 500);
  }, [currentSection]);

  return (
    <FullPageContainer
      id="start"
      bgImageUrl={BackgroundImage}
      spacing={8}
      justify="flex-end"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Stack
          pos="relative"
          align="center"
          justify="left"
          spacing={8}
          pb={10}
          direction={{ base: 'column', lg: 'column' }}
          maxW="lg"
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '3rem'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Heading
            fontFamily="body"
            fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
            fontWeight="300"
            color="white"
            textAlign="center"
          >
            MetaGame
          </Heading>

          <Text
            className="gradient"
            fontSize={{ base: 'md', md: '2xl', lg: '3xl' }}
            textAlign="center"
          >
            A Massive Online Coordination Game
          </Text>

          <Stack
            spacing={{ base: 4, md: 8 }}
            justify="space-evenly"
            direction={{ base: 'column', sm: 'row' }}
          >
            <StartButton text="Play" />
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
      </Container>
    </FullPageContainer>
  );
};
