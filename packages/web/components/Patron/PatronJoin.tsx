import { Box, Container, Flex, Image, MetaButton, Text } from '@metafam/ds';
import { Patron } from 'graphql/types';

import BlueArrow from '../../assets/patron/blue-arrow.png';
import CheckMark from '../../assets/patron/checkmark.png';
import PatronCircle from '../../assets/patron/patron-circle.png';
import PatronMage from '../../assets/patron/patron-mage.png';
import Seed from '../../assets/patron/seed.png';
import SeedsEconomy from '../../assets/patron/seed-economy.png';
import { PatronList } from './PatronList';

type Props = {
  patrons: Array<Patron>;
};

const LEAGUES = [
  {
    id: 0,
    title: '',
    count: 0,
    amount: 0,
    header: false,
    arrow: 'right',
    body: (
      <Box>
        <Text mb="12">Becoming a patron also comes with some perks!</Text>
        <Text>
          Do note the total number of Patrons in Phase I is limited to 150; the
          rank requirements are subject to change based on top 150 pSeed hodlors
          & most perks (besides seasonal) will only be unlocked in the
          transition to Phase II - set for Q3 2023.
        </Text>
      </Box>
    ),
    list: [],
  },
  {
    id: 1,
    title: 'All Patrons',
    count: 94,
    amount: 160,
    header: true,
    arrow: 'left',
    body: null,
    list: [
      'Membership & a vote in MetaGame',
      'Access to everything players can access',
      'A member of The 300 of MetaGame',
      'Achievement NFT',
      'Appearance on the leaderboard',
      'A you.metafam.eth address',
      'Patrons-only chat',
      'Automatically whitelisted for any drop',
      'Monthly Q&A with the Champions',
      'Guaranteed entry to MetaFest IRL 2023 (Q3 2023)',
    ],
  },
  {
    id: 2,
    title: 'Bronze League',
    count: 21,
    amount: 925.68,
    header: true,
    arrow: 'right',
    body: null,
    list: [
      'Ranked league achievement NFT',
      'Octo wearable for the metaverse',
      'Lifetime membership with all premium features',
      'Shill package',
      'Qualify for Elders Ring (advisory circle)',
      'Early access to limited edition drops',
      'Genesis MetaManisfesto NFT',
    ],
  },
  {
    id: 3,
    title: 'Silver League',
    count: 14,
    amount: 3600.64,
    header: true,
    arrow: 'left',
    body: null,
    list: [
      'Free pass to any MetaGame event',
      'Higher weight votes',
      'Achievement defined & named by you',
      'Access to the ancient MG Notion archive',
      'A digitphysical MetaGame shirt',
    ],
  },
  {
    id: 4,
    title: 'Golden League',
    count: 7,
    amount: 54616.16,
    header: true,
    arrow: 'right',
    body: null,
    list: [
      'You as an NPC in MetaGame',
      'Hall of fame in all MG metaverse embassies',
      'Access to the ancient MetaGame Roam archive',
      'Forever renewing the shirt',
    ],
  },
  {
    id: 5,
    title: 'Platinum League',
    count: 7,
    amount: 7201.28,
    header: true,
    arrow: 'left',
    body: null,
    list: [
      'Private AMA with any Champion or Diamond player',
      'Priority access to MetaGame investment deals',
      'NFT achievement named after you',
      'Part of the lore',
    ],
  },
  {
    id: 6,
    title: 'Diamond League',
    count: 7,
    amount: 10807,
    header: true,
    arrow: 'left',
    body: null,
    list: [
      'Talk access at Champions Ring calls',
      'Genesis Epic MetaManifesto (on sale for 1eth)',
      'MetaFest 2023 free accommondation',
      'Diamond league merch',
      'A part of the last Seed supper photo    ',
    ],
  },
  {
    body: <Text fontWeight="bold">...aaand for the one & only 👇</Text>,
  },
];

const No1Patron = {
  id: 7,
  title: "No.1 Patron of MetaGame' Seed Phase",
  count: 94,
  header: true,
  arrow: 'left',
  body: null,
  list: [
    'Top spot on the patrons leaderboard',
    'Unique achievement NFT',
    'You become the patron saint of MetaGame with a holiday in your name',
    'The original MetaGame sketch along with an NFT, signed by peth & given in-person',
  ],
};

type LeagueProps = {
  title: string;
  count: number;
  amount: number;
  header: boolean;
  arrow: string;
  body: Element;
  list: string[];
  id: number;
  style: any;
};

type ItemProps = {
  item: string;
};

const LeagueCardItem: React.FC<ItemProps> = (props: ItemProps) => (
  <Flex flexDirection="row" justifyContent="space-between">
    <Text color="white" fontSize="sm">
      {props.item}
    </Text>
    <Image src={CheckMark} width="1rem" m={1} />
  </Flex>
);

const getLeagueCardStyling = (id: number) => {
  console.log('card id: ', id);
  const getTopPos: any = {
    0: '60px',
    1: '280px',
    2: '160px',
    3: '180px',
    4: '80px',
    5: '160px',
    6: '130px',
  };
  let style: any = {
    backdropFilter: 'blur(7px)',
  };
  if (id && id !== 7) {
    style = {
      ...style,
      _after: {
        content: '""',
        background: `url(${BlueArrow})`,
        height: '28px',
        width: '26px',
        position: 'absolute',
        top: getTopPos[id],
        [id % 2 === 1 ? 'left' : 'right']: '-25px',
        transform: id % 2 === 1 ? 'rotate(180deg)' : 'rotate(0)',
      },
    };
  }
  return style;
};

const LeagueCard: React.FC<LeagueProps> = (props: LeagueProps) => (
  <Flex
    direction="column"
    mx="4"
    my="5"
    bg="whiteAlpha.200"
    rounded="lg"
    {...getLeagueCardStyling(props.id)}
    {...props.style}
  >
    {props.header ? (
      <Flex
        direction="row"
        justify="space-between"
        bg="purpleBoxLight"
        p="4"
        roundedTop="lg"
      >
        <Text color="white" fontWeight="bold">
          {props.title}
        </Text>
        <Text color="landing450" fontSize="sm" fontWeight="bold">
          total of {props.count}
        </Text>
        <Text color="white" fontSize="md">
          {props.amount ? `$${Number(props.amount).toLocaleString()}` : '     '}
        </Text>
      </Flex>
    ) : (
      ''
    )}
    <Flex p={8} flexDirection="column">
      {props.body && <Text fontSize="md">{props.body}</Text>}
      {props.list &&
        props.list.map((item, i) => <LeagueCardItem item={item} key={i} />)}
    </Flex>
  </Flex>
);

export const PatronJoin: React.FC<Props> = ({ patrons }) => (
  <Container maxW="75rem">
    <Flex direction="column">
      <Text mb="6" align="center" fontSize="6xl" fontWeight="bold" as="h1">
        Join as a Patron!
      </Text>

      {/* Who are Patrons? */}

      <Text mb="6" fontSize="lg" fontWeight="bold" as="h3">
        Who are Patrons?
      </Text>
      <Flex direction="column" width="100%" align="center">
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          p={6}
          maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
          w="100%"
          h="100%"
          align="stretch"
          position="relative"
          overflow="hidden"
          justify="space-between"
          my={12}
        >
          <Flex justify="center" align="center">
            <Image src={PatronMage} height="auto" width="400px" my="6" />
          </Flex>
          <Text fontSize="md" as="p" fontWeight="bold" marginBottom="2">
            Patrons are a vital part of the MetaGame
          </Text>
          <Text>
            As opposed to players, who are actively contributing their labor
            towards the creation of MetaGame & thus generating Seeds; patrons
            are here to water those Seeds until the Trees grow & MetaGame
            becomes self-sustainable.
          </Text>
        </Flex>
      </Flex>

      {/* Watering Seeds */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        Watering Seeds
      </Text>
      <Flex direction="column" width="100%" align="center">
        <Image
          src={SeedsEconomy}
          height="auto"
          width="80vw"
          my="6"
          maxW="50rem"
        />
        <Box mb={4} px={2}>
          <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
            MORE ABOUT SEEDS
          </MetaButton>
        </Box>
      </Flex>

      {/* What is the product */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        So what’s the product, what’s the revenue model???
      </Text>
      <Flex justify="end">
        <Text
          p="4"
          textAlign="right"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          maxW="45rem"
          mr={5}
        >
          There are a few, actually, along with various monetization &
          sustainability strategies. If you want to dig deeper, it might be best
          to dig down the raids section & ask some questions or read the
          Purplepaper 🙃
        </Text>
      </Flex>

      {/* Why be a Patron  */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        Why you should become a Patron of MetaGame?
      </Text>
      <Flex justify="end">
        <Text
          p="4"
          textAlign="right"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          maxW="45rem"
          mr={5}
        >
          We prefer our patrons inrinsically motivated, so the main reason you'd
          want to become a patron is just the fact you love this whole idea of
          MetaGame & want to see it succeed. If you weren’t so damn busy, you’d
          probably join in on building it, but at this point, its easier for you
          to just pitch in a bucket of water & support the movement passively.
        </Text>
      </Flex>

      {/* Ranked Leagues & Perks */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        Ranked Leagues & Perks
      </Text>
      <Flex flexDirection="row" alignItems="stretch">
        <Flex
          width="50%"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="space-between"
          justifyContent="space-between"
        >
          {LEAGUES.filter((_, i) => i % 2 === 0).map((league) => (
            <LeagueCard {...league} key={league.id} />
          ))}
        </Flex>
        <Flex
          width="50%"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="space-between"
          justifyContent="space-between"
        >
          {LEAGUES.filter((_, i) => i % 2 === 1).map((league) => (
            <LeagueCard {...league} key={league.id} />
          ))}
        </Flex>
      </Flex>
      <Flex
        width="100%"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
      >
        <LeagueCard {...No1Patron} />
        <Box
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          m="8"
          p="4"
        >
          <Text fontSize="sm">
            Note: Yes, you get what the previous league gets + your own league
            perks!
          </Text>
        </Box>
      </Flex>

      {/* Other patrons include... */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        Other patrons include...
      </Text>

      <Flex direction="column" width="100%" align="center">
        <PatronList patrons={patrons} />
        <Box mt={12} mb={4} px={2}>
          <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
            LOAD MORE
          </MetaButton>
        </Box>
      </Flex>

      {/* How to become a patron? */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        How to become a patron?
      </Text>

      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Flex direction="column" width="100%" align="center">
          <Flex
            direction="column"
            bg="whiteAlpha.200"
            style={{ backdropFilter: 'blur(7px)' }}
            rounded="lg"
            p={6}
            maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
            w="100%"
            h="100%"
            align="stretch"
            position="relative"
            overflow="hidden"
            justify="space-between"
            my={12}
          >
            <Flex justify="center" align="center">
              <Image src={Seed} height="auto" maxW="16rem" my="6" mb="12" />
            </Flex>
            <Text fontSize="md" as="p" fontWeight="bold" marginBottom="2">
              Water Seeds yourself
            </Text>
            <Text>
              Watering Seeds means adding Ether & Rai to the Seed pool aka
              plantation. You’ll need to have some Ether on Polygon, add it to
              the pool, join discord & talk to the collab land bot to let you
              in.
            </Text>
            <Text>Want a more detailed guide?</Text>
            <Flex mt="6" justifyContent="center">
              <Box mb={4} px={2}>
                <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
                  YES PLS!
                </MetaButton>
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
          OR
        </Text>

        <Flex direction="column" width="100%" align="center">
          <Flex
            direction="column"
            bg="whiteAlpha.200"
            style={{ backdropFilter: 'blur(7px)' }}
            rounded="lg"
            p={6}
            maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
            w="100%"
            h="100%"
            align="stretch"
            position="relative"
            overflow="hidden"
            justify="space-between"
            my={12}
          >
            <Flex justify="center" align="center">
              <Image src={PatronCircle} height="auto" maxW="16rem" my="6" />
            </Flex>
            <Text fontSize="md" as="p" fontWeight="bold" marginBottom="2">
              Buy & forget about it
            </Text>
            <Text>
              Too busy for buying the esoteric Rai, bridging over to Polygon &
              patiently watering Seeds over a long period of time so as to not
              overwater & slip?
            </Text>
            <Text>
              We got you covered! You can buy a chunk directly from MetaFam,
              just ask.
            </Text>
            <Flex mt="6" justifyContent="center">
              <Box mb={4} px={2}>
                <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
                  PERFECT!
                </MetaButton>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Container>
);
