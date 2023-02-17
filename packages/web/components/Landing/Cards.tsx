import { Image, ListItem, OrderedList, Stack, Text, VStack } from '@metafam/ds';
import GuildsImage from 'assets/landing/guilds.webp';
import PatronsImage from 'assets/landing/patrons.webp';
import PlayersImage from 'assets/landing/players.webp';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useRef } from 'react';

type CardProps = {
  title: string;
  image: string;
  description: string;
  listTitle: string;
  list: string[];
};

const Card: React.FC<CardProps> = ({
  title,
  image,
  description,
  listTitle,
  list,
}) => (
  <Stack
    spacing={{ base: 4, '2xl': 12 }}
    bg="whiteAlpha.50"
    borderRadius="md"
    align="center"
    p={{ base: 6, xl: 8, '2xl': 12 }}
  >
    <Image maxWidth={{ base: '8rem', '2xl': '12rem' }} src={image} />
    <VStack>
      <Text
        fontSize={{ base: '2xl', xl: '3xl', '2xl': '2.5rem' }}
        textAlign="center"
      >
        {title}
      </Text>
      <Text fontSize={{ base: 'sm', xl: 'md', '2xl': '1.25rem' }}>
        {description}
      </Text>

      <Text>{listTitle}</Text>
      <OrderedList fontSize={{ base: 'sm', xl: 'md', '2xl': '1.25rem' }} pl={6}>
        {list.map((item, idx) => (
          <ListItem key={idx}>{item}</ListItem>
        ))}
      </OrderedList>
    </VStack>
  </Stack>
);

export const Cards: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);

  return (
    <Stack
      ref={ref}
      direction={{ base: 'column', md: 'row' }}
      color="white"
      spacing={{ base: 4, lg: 12 }}
      fontSize="md"
      maxW="96rem"
      transform={`translate3d(0, ${onScreen ? '0' : '50px'}, 0)`}
      opacity={onScreen ? 1 : 0}
      transition="transform 0.3s 0.3s ease-in-out, opacity 0.5s 0.4s ease-in"
    >
      <Card
        title="PLAYERS"
        image={PlayersImage.src}
        description="MetaGame is for those who want to play an active role in building the future."
        listTitle="For those who want to:"
        list={[
          'Build their knowledge, get experience & level up.',
          'Find cool projects, solve problems & get paid.',
          'Become a part of something bigger.',
        ]}
      />
      <Card
        title="GUILDS"
        image={GuildsImage.src}
        description="It's also for groups of people, those building tools & services for a decentralized future."
        listTitle="For those who want"
        list={[
          'Help finding tools, frameworks & accessible funds.',
          'Help getting value-aligned contributors & adopters',
          'Become part of the "new world" puzzle.',
        ]}
      />
      <Card
        title="PATRONS"
        image={PatronsImage.src}
        description="Those who really want to see MetaGame succeed, but prefer to help with funds."
        listTitle="Why?"
        list={[
          'They love builder onboarding & support systems.',
          'Membership and other things, all paid in SEEDs.',
          'Understanding MetaGame made them go: “Fuck yeah!”',
        ]}
      />
    </Stack>
  );
};
