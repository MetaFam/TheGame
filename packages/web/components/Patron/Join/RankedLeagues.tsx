import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useMediaQuery,
  VStack,
} from '@metafam/ds';

import { LeagueCard } from './LeagueCard';

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
  list: [
    'Top spot on the patrons leaderboard',
    'Unique achievement NFT',
    'You become the patron saint of MetaGame with a holiday in your name',
    'The original MetaGame sketch along with an NFT, signed by peth & given in-person',
  ],
};

export const RankedLeagues = () => {
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');

  const renderHorizontal = () => (
    <VStack>
      <Flex flexDirection="row" alignItems="stretch">
        <Flex
          width="50%"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="space-between"
          justifyContent="space-between"
        >
          {LEAGUES.filter((_, i) => i % 2 === 0).map((league) => (
            <LeagueCard {...league} key={league.id} isVertical={false} />
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
            <LeagueCard {...league} key={league.id} isVertical={false} />
          ))}
        </Flex>
      </Flex>
    </VStack>
  );

  const renderVertical = () => (
    <Flex
      flexDirection="column"
      alignItems="space-between"
      justifyContent="space-between"
    >
      {LEAGUES.map((league) => (
        <LeagueCard {...league} key={league.id} isVertical={true} />
      ))}
    </Flex>
  );
  console.log('isLargerThanLg ', isLargerThanLg);
  return (
    <Container
      as="section"
      className="mg-patron-join-section"
      my={[8, 8, 8, 12]}
    >
      <Heading
        as="h2"
        color="white"
        fontFamily="mono"
        fontWeight={700}
        mb={[4, 4, 4, 12]}
      >
        Ranked Leagues &amp; Perks
      </Heading>

      {isLargerThanLg ? renderHorizontal() : renderVertical()}

      <VStack>
        <Flex
          width="100%"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
        >
          <LeagueCard {...No1Patron} key={No1Patron.id} isVertical={false} />
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
      </VStack>
    </Container>
  );
};
