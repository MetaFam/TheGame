import { Box, Container, Flex, Heading, List, Text, VStack } from '@metafam/ds';
import BlueArrow from 'assets/patron/blue-arrow.png';
import { PlayerRank_Enum, TokenBalancesFragment } from 'graphql/autogen/types';
import {
  getLeagueCount,
  getLeagueCutoff,
  getPatronHoldingsUsd,
  MIN_PATRON_PSEEDS,
  NUM_PATRONS,
} from 'utils/patronHelpers';

import { LeagueCardItem } from './LeagueCardItem';

const AllPatronsList = [
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
];
const BronzeLeagueList = [
  'Ranked league achievement NFT',
  'Octo wearable for the metaverse',
  'Lifetime membership with all premium features',
  'Shill package',
  'Qualify for Elders Ring (advisory circle)',
  'Early access to limited edition drops',
  'Genesis MetaManisfesto NFT',
];
const SilverLeagueList = [
  'Free pass to any MetaGame event',
  'Higher weight votes',
  'Achievement defined & named by you',
  'Access to the ancient MG Notion archive',
  'A digitphysical MetaGame shirt',
];
const GoldenLeagueList = [
  'You as an NPC in MetaGame',
  'Hall of fame in all MG metaverse embassies',
  'Access to the ancient MetaGame Roam archive',
  'Forever renewing the shirt',
];
const PlatinumLeagueList = [
  'Private AMA with any Champion or Diamond player',
  'Priority access to MetaGame investment deals',
  'NFT achievement named after you',
  'Part of the lore',
];
const DiamondLeagueList = [
  'Talk access at Champions Ring calls',
  'Genesis Epic MetaManifesto (on sale for 1eth)',
  'MetaFest 2023 free accommondation',
  'Diamond league merch',
  'A part of the last Seed supper photo    ',
];
const No1PatronList = [
  'Top spot on the patrons leaderboard',
  'Unique achievement NFT',
  'You become the patron saint of MetaGame with a holiday in your name',
  'The original MetaGame sketch along with an NFT, signed by peth & given in-person',
];
const RightArrowStyle = {
  content: '""',
  background: `url(${BlueArrow})`,
  height: '1.75em',
  width: '1.625em',
  display: 'block',
  float: { base: 'none', md: 'left' },
  marginTop: { base: '0', md: '0.75em' }, // Lines the arrow up with the heading, em units required to match the padding on the heading
  mx: { base: 'auto', md: '0.25em' },
  transform: { base: 'rotate(90deg)', md: 'rotate(0deg)' },
};
const LeftArrowStyle = {
  content: '""',
  background: `url(${BlueArrow})`,
  height: '1.75em',
  width: '1.625em',
  display: 'block',
  float: { base: 'none', md: 'right' },
  marginTop: { base: '0', md: '0.5em' }, // Lines the arrow up with the heading, em units required to match the padding on the heading
  mx: { base: 'auto', md: '-1.25em' },
  transform: { base: 'rotate(90deg)', md: 'rotate(180deg)' },
  position: 'relative',
  left: '0.6em',
};

type PerksProps = {
  title: string;
  count: number | string;
  amount: number;
};

const PerksHeader = ({ title, count, amount }: PerksProps) => (
  <Flex
    direction="row"
    justify="space-between"
    bg="purpleBoxLight"
    p="4"
    roundedTop="lg"
    width={'100%'}
  >
    <Text color="white" fontWeight="bold">
      {title}
    </Text>
    <Text color="landing450" fontSize="sm" fontWeight="bold">
      {typeof count === 'number'
        ? `(total of ${Number(count).toLocaleString()})`
        : `(${count})`}
    </Text>
    <Text color="white" fontSize="md">
      {`$${Number(amount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`}
    </Text>
  </Flex>
);

type Props = {
  pSeedPrice: number;
  pSeedHolders: TokenBalancesFragment[];
};

const PerksGrid: React.FC<Props> = ({ pSeedPrice, pSeedHolders }) => (
  <Container w="100%" maxW="6xl" my={12}>
    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'left' }}
    >
      <VStack
        spacing={0}
        minH="5rem"
        borderRadius={8}
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <Box bg="whiteAlpha.200" borderRadius={8} px={8} py={8}>
          <Heading
            as="h2"
            color="white"
            fontFamily="mono"
            fontWeight={700}
            mb={[4, 4, 4, 12]}
          >
            Ranked Leagues &amp; Perks
          </Heading>

          <Text as="p" fontWeight="700" color="white" mb={4}>
            Becoming a patron also comes with some perks!
          </Text>
          <Text as="p" color="white">
            Do note the total number of Patrons in Phase I is limited to 150;
            the rank requirements are subject to change based on top 150 pSeed
            hodlors &amp; most perks (besides seasonal) will only be unlocked in
            the transition to Phase II - set for Q3 2023.
          </Text>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'right' }}
      _before={RightArrowStyle}
      mt={{ base: '0', md: '4.5em' }}
    >
      <VStack
        spacing={0}
        borderRadius={8}
        minH="12rem"
        bg="whiteAlpha.200"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'All Patrons'}
          count={NUM_PATRONS}
          amount={MIN_PATRON_PSEEDS * pSeedPrice}
        />

        <Flex p={8} width="100%" flexDirection="row" flexWrap="wrap">
          {AllPatronsList.map((text: string) => (
            <LeagueCardItem text={text} />
          ))}
        </Flex>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'left' }}
      _before={LeftArrowStyle}
    >
      <VStack
        bg="whiteAlpha.200"
        spacing={0}
        borderRadius={8}
        minH="10rem"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'Bronze League'}
          count={getLeagueCount(PlayerRank_Enum.Bronze)}
          amount={getLeagueCutoff(
            PlayerRank_Enum.Bronze,
            pSeedHolders,
            pSeedPrice,
          )}
        />
        <Box p={8} width="100%" color="white">
          <Flex width="100%" flexDirection="row" flexWrap="wrap">
            {BronzeLeagueList.map((text: string) => (
              <LeagueCardItem text={text} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'right' }}
      _before={RightArrowStyle}
    >
      <VStack
        spacing={0}
        borderRadius={8}
        minH="8rem"
        bg="whiteAlpha.200"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'Silver League'}
          count={getLeagueCount(PlayerRank_Enum.Silver)}
          amount={getLeagueCutoff(
            PlayerRank_Enum.Silver,
            pSeedHolders,
            pSeedPrice,
          )}
        />

        <Box p={8} width="100%" color="white">
          <List textAlign="left">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {SilverLeagueList.map((text: string) => (
                <LeagueCardItem text={text} />
              ))}
            </Flex>
          </List>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'left' }}
      _before={LeftArrowStyle}
    >
      <VStack
        spacing={0}
        borderRadius={8}
        minH="8rem"
        bg="whiteAlpha.200"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'Gold League'}
          count={getLeagueCount(PlayerRank_Enum.Gold)}
          amount={getLeagueCutoff(
            PlayerRank_Enum.Gold,
            pSeedHolders,
            pSeedPrice,
          )}
        />

        <Box p={8} width="100%" color="white">
          <Flex width="100%" flexDirection="row" flexWrap="wrap">
            {GoldenLeagueList.map((text: string) => (
              <LeagueCardItem text={text} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'right' }}
      _before={RightArrowStyle}
    >
      <VStack
        spacing={0}
        borderRadius={8}
        minH="5rem"
        bg="whiteAlpha.200"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'Platinum League'}
          count={getLeagueCount(PlayerRank_Enum.Platinum)}
          amount={getLeagueCutoff(
            PlayerRank_Enum.Platinum,
            pSeedHolders,
            pSeedPrice,
          )}
          // amount={3631}
        />

        <Box p={8} width="100%" color="white">
          <Flex width="100%" flexDirection="row" flexWrap="wrap">
            {PlatinumLeagueList.map((text: string) => (
              <LeagueCardItem text={text} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'left' }}
      _before={LeftArrowStyle}
    >
      <VStack
        spacing={0}
        borderRadius={8}
        minH="6rem"
        bg="whiteAlpha.200"
        mb={{ base: 0, md: '1em' }} // the arrow on the next Box arrow makes the margin at base breakpoint
      >
        <PerksHeader
          title={'Diamond League'}
          count={getLeagueCount(PlayerRank_Enum.Diamond)}
          amount={getLeagueCutoff(
            PlayerRank_Enum.Diamond,
            pSeedHolders,
            pSeedPrice,
          )}
        />

        <Box p={8} width="100%" color="white">
          <Flex width="100%" flexDirection="row" flexWrap="wrap">
            {DiamondLeagueList.map((text: string) => (
              <LeagueCardItem text={text} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>

    <Box
      width={{ base: '100%', md: '50%' }}
      float={{ base: 'none', md: 'right' }}
      _before={RightArrowStyle}
      _after={{
        content: '""',
        background: `url(${BlueArrow})`,
        height: '1.75em',
        width: '1.625em',
        transform: 'rotate(90deg)',
        display: 'block',
        left: { base: 'calc(50% - 0.8125em)', md: '10.625em' },
        top: '0px',
        position: 'relative',
      }}
    >
      <VStack spacing={0} minH="1rem" align="left" isInline>
        <Box
          mx={{ base: 'auto', md: '0' }}
          bg="whiteAlpha.200"
          borderRadius={8}
        >
          <Text
            as="p"
            textAlign="center"
            fontWeight="700"
            color="white"
            borderRadius={8}
            px={12}
            py={4}
          >
            &hellip;aaaand for the one &amp; only 👇
          </Text>
        </Box>
      </VStack>
    </Box>

    <Box
      minH="5rem"
      width={{ base: '100%', md: '50%' }}
      mx={{ base: 0, md: 'auto' }}
      sx={{ clear: 'both' }}
    >
      <VStack spacing={0} borderRadius={8} minH="6rem" bg="whiteAlpha.200">
        <PerksHeader
          title={'No. 1 Patron of MetaGame’s Seed Phase'}
          count={'unique'}
          amount={getPatronHoldingsUsd(pSeedHolders?.[0], pSeedPrice)}
        />

        <Box p={8} width="100%" color="white">
          <Flex width="100%" flexDirection="row" flexWrap="wrap">
            {No1PatronList.map((text: string) => (
              <LeagueCardItem text={text} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>
  </Container>
);

export default PerksGrid;
