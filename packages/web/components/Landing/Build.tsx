import { Flex, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/build-background.png';
import { FullPageContainer } from 'components/Container';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRef } from 'react';
import { LandingNextButton } from './LandingNextButton';


export const Build: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const section = 'build-the-future';

  return (
    <FullPageContainer
      bgImageUrl={BackgroundImage}
      id={section}
      position="relative"
      color="white"
    >
      <Flex
        ref={ref}
        direction="column"
        justify="center"
        fontSize={{ base: '1.5rem', lg: '2.375rem' }}
        lineHeight={{ base: '2.35rem', lg: '3.5rem' }}
        maxWidth={{ base: 'unset', md: 'md', lg: 'lg' }}
        pl={0}
        zIndex={100}
        transform={`translate3d(0, ${onScreen ? 0 : '50px'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
      >
        <Text>
          Many have already woken up to the world-shaping potential of Web3
          technologies.
        </Text>

        <Text pt={{ base: 4, md: 8 }}>
          Some are grabbing the opportunity to build the future they want to
          live in.
        </Text>
      </Flex>
      <LandingNextButton section="a-revolution" />
    </FullPageContainer>
  );
};
