import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  ListItem,
  OrderedList,
  Text,
} from '@metafam/ds';
import CardBackground from 'assets/landing/card-background.png';
import CardImage from 'assets/landing/card-image.png';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Cards: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, '100px');
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Container
      id="section-12"
      position="relative"
      centerContent
      h={{ base: 'auto', lg: '100vh' }}
      pb={{ base: 20, lg: 0 }}
      maxW="full"
    >
      <Flex
        ref={ref}
        spacing={0}
        direction={{ base: 'column', md: 'row' }}
        transform={`translate3d(0, ${onScreen ? '0' : '20vh'}, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
      >
        <Box
          backgroundImage={`url(${CardBackground})`}
          bgPosition="center"
          bgSize="cover"
          width={{ base: '100%', md: '33%' }}
          minH="100vh"
          display="flex"
          alignItems="center"
          flexDirection="column"
          px={{ base: 8, md: 16 }}
        >
          <Image
            maxWidth="13.75rem"
            pt={{ base: 6, lg: '9.563rem' }}
            pb={{ base: 2, lg: '2.5rem' }}
            src={CardImage}
          />
          <Box>
            <Text
              pb={{ base: 3, lg: '2.5rem' }}
              fontSize={{ base: '3xl', lg: '5xl' }}
              lineHeight="2.5rem"
              textAlign="center"
            >
              PLAYERS
            </Text>
            <Text fontSize="1.25rem" pb={{ base: 3, lg: '2.5rem' }}>
              MetaGame is for those who want to play an active role in building
              the future.
            </Text>

            <Text pb="1.25rem">For those who want to:</Text>
            <OrderedList
              pb={{ base: 8, lg: '9.563rem' }}
              fontSize={{ base: 'lg', lg: 'xl' }}
              lineHeight={{ base: 'lg', lg: 'xl' }}
            >
              <ListItem pb="1.25rem">
                Build their knowledge, get experience & level up.
              </ListItem>
              <ListItem pb="1.25rem">
                Find cool projects, solve problems & get paid.
              </ListItem>
              <ListItem pb="1.25rem">
                Become a part of something bigger.
              </ListItem>
            </OrderedList>
          </Box>
        </Box>
        <Box
          bgPosition="center"
          bgSize="cover"
          backgroundImage={`url(${CardBackground})`}
          width={{ base: '100%', md: '33%' }}
          minH="100vh"
          display="flex"
          alignItems="center"
          flexDirection="column"
          px={{ base: 8, md: 16 }}
        >
          <Image
            maxWidth="13.75rem"
            pt={{ base: 6, lg: '9.563rem' }}
            pb={{ base: 2, lg: '2.5rem' }}
            src={CardImage}
          />
          <Box max-width="20.438rem">
            <Text
              pb={{ base: 3, lg: '2.5rem' }}
              fontSize={{ base: '3xl', lg: '5xl' }}
              lineHeight="2.5rem"
              textAlign="center"
            >
              GUILDS
            </Text>
            <Text fontSize="1.25rem" pb={{ base: 3, lg: '2.5rem' }}>
              It's also for groups of people, those building tools & services
              for a decentralized future.
            </Text>

            <Text pb="1.25rem">For those who want</Text>
            <OrderedList
              pb={{ base: 6, lg: '9.563rem' }}
              fontSize={{ base: 'lg', lg: 'xl' }}
              lineHeight={{ base: 'lg', lg: 'xl' }}
            >
              <ListItem pb="1.25rem">
                Help finding tools, frameworks & accessible funds.
              </ListItem>
              <ListItem pb="1.25rem">
                Help getting value-aligned contributors & adopters
              </ListItem>
              <ListItem pb="1.25rem">
                Become part of the "new world" puzzle.
              </ListItem>
            </OrderedList>
          </Box>
        </Box>
        <Box
          backgroundImage={`url(${CardBackground})`}
          bgPosition="center"
          bgSize="cover"
          width={{ base: '100%', md: '33%' }}
          minH="100vh"
          display="flex"
          alignItems="center"
          flexDirection="column"
          px={{ base: 8, md: 16 }}
        >
          <Image
            maxWidth="13.75rem"
            pt={{ base: 6, lg: '9.563rem' }}
            pb={{ base: 2, lg: '2.5rem' }}
            src={CardImage}
          />
          <Box max-width="20.438rem">
            <Text
              pb={{ base: 3, lg: '2.5rem' }}
              fontSize={{ base: '3xl', lg: '5xl' }}
              lineHeight="2.5rem"
              textAlign="center"
            >
              PATRONS
            </Text>
            <Text fontSize="1.25rem" pb={{ base: 3, lg: '2.5rem' }}>
              Those who really want to see MetaGame succeed, but prefer to help
              with funds.
            </Text>

            <Text pb="1.25rem">Why?</Text>
            <OrderedList
              pb={{ base: 8, lg: '9.563rem' }}
              fontSize={{ base: 'lg', lg: 'xl' }}
              lineHeight={{ base: 'lg', lg: 'xl' }}
            >
              <ListItem pb="1.25rem">
                They love builder onboarding & support systems.
              </ListItem>
              <ListItem pb="1.25rem">
                Membership and other things, all paid in Seeds.
              </ListItem>
              <ListItem pb="1.25rem">
                Understanding MetaGame made them go: Fuck yeah!
              </ListItem>
            </OrderedList>
          </Box>
        </Box>
      </Flex>
      <Box
        pos="absolute"
        bottom="0"
        pb={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={200}
        centerContent
      >
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-13')}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};
