import { Image, ListItem, OrderedList, Stack, Text, VStack } from '@metafam/ds';
import GuildsImage from 'assets/landing/guilds.png';
import PatronsImage from 'assets/landing/patrons.png';
import PlayersImage from 'assets/landing/players.png';

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
    spacing={12}
    bg="whiteAlpha.50"
    borderRadius="md"
    align="center"
    p={12}
  >
    <Image maxWidth="12rem" src={image} />
    <VStack>
      <Text fontSize="2.5rem" textAlign="center">
        {title}
      </Text>
      <Text fontSize="1.25rem">{description}</Text>

      <Text>{listTitle}</Text>
      <OrderedList fontSize="1.25rem">
        {list.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </OrderedList>
    </VStack>
  </Stack>
);

export const Cards: React.FC = () => (
  <Stack
    direction={{ base: 'column', md: 'row' }}
    color="white"
    spacing={12}
    fontSize="md"
    maxW="96rem"
  >
    <Card
      title="PLAYERS"
      image={PlayersImage}
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
      image={GuildsImage}
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
      image={PatronsImage}
      description="Those who really want to see MetaGame succeed, but prefer to help with funds."
      listTitle="Why?"
      list={[
        'They love builder onboarding & support systems.',
        'Membership and other things, all paid in Seeds.',
        'Understanding MetaGame made them go: Fuck yeah!',
      ]}
    />
  </Stack>
);
