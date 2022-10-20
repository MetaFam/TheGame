import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  Text,
  Tooltip,
  VStack,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import BlueArrow from 'assets/patron/blue-arrow.png';
import { PlayerRank_Enum, TokenBalancesFragment } from 'graphql/autogen/types';
import {
  getLeagueCount,
  getLeagueCutoff,
  getPatronPSeedHoldings,
  MIN_PATRON_PSEEDS,
  NUM_PATRONS,
  PATRON_RANKS,
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
  pSeeds: number;
  amountUsd: Maybe<number>;
};

const PerksHeader = ({ title, count, pSeeds, amountUsd }: PerksProps) => {
  const pSeedLabel = `${pSeeds.toLocaleString(undefined, {
    maximumFractionDigits: 1,
  })} pSEED`;
  const amountLabel = amountUsd
    ? `$${Number(amountUsd).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : pSeedLabel;
  let amountDisplay = (
    <Text color="white" fontSize="md">
      {amountLabel}
    </Text>
  );
  if (amountUsd != null) {
    amountDisplay = <Tooltip label={pSeedLabel}>{amountDisplay}</Tooltip>;
  }
  return (
    <Flex
      direction="row"
      justify="space-between"
      bg="purpleBoxLight"
      p="4"
      roundedTop="lg"
      width="100%"
    >
      <Text color="white" fontWeight="bold">
        {title}
      </Text>
      <Text color="landing450" fontSize="sm" fontWeight="bold">
        {typeof count === 'number'
          ? `(total of ${count.toLocaleString()})`
          : `(${count})`}
      </Text>
      {amountDisplay}
    </Flex>
  );
};

type Props = {
  pSeedPrice: Maybe<number>;
  pSeedHolders: TokenBalancesFragment[];
};

const PerksGrid: React.FC<Props> = ({ pSeedPrice, pSeedHolders }) => {
  const leaguePSeedsByRank: { [rank: string]: number } = {};
  PATRON_RANKS.forEach((rankEnum) => {
    leaguePSeedsByRank[rankEnum] = getLeagueCutoff(rankEnum, pSeedHolders);
  });
  const topHodlerPSeeds = getPatronPSeedHoldings(pSeedHolders[0]);

  return (
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
              The total number of Patrons in Phase I is limited to 150. The rank
              requirements are subject to change based on top 150 pSeed hodlors
              &amp; most perks (besides seasonal) will only be unlocked in the
              transition to Phase II — set for Q3 2023.
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box
        width={{ base: '100%', md: '50%' }}
        float={{ base: 'none', md: 'right' }}
        _before={RightArrowStyle}
        mt={{ base: 0, md: '4.5em' }}
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
            pSeeds={MIN_PATRON_PSEEDS}
            amountUsd={pSeedPrice ? MIN_PATRON_PSEEDS * pSeedPrice : null}
          />

          <Flex p={8} width="100%" flexDirection="row" flexWrap="wrap">
            {AllPatronsList.map((text: string, index) => (
              <LeagueCardItem key={index} text={text} />
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
            pSeeds={leaguePSeedsByRank[PlayerRank_Enum.Bronze]}
            amountUsd={
              pSeedPrice
                ? leaguePSeedsByRank[PlayerRank_Enum.Bronze] * pSeedPrice
                : null
            }
          />
          <Box p={8} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {BronzeLeagueList.map((text: string, index) => (
                <LeagueCardItem key={index} text={text} />
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
            pSeeds={leaguePSeedsByRank[PlayerRank_Enum.Silver]}
            amountUsd={
              pSeedPrice
                ? leaguePSeedsByRank[PlayerRank_Enum.Silver] * pSeedPrice
                : null
            }
          />

          <Box p={8} width="100%" color="white">
            <List textAlign="left">
              <Flex width="100%" flexDirection="row" flexWrap="wrap">
                {SilverLeagueList.map((text: string, index) => (
                  <LeagueCardItem key={index} text={text} />
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
            pSeeds={leaguePSeedsByRank[PlayerRank_Enum.Gold]}
            amountUsd={
              pSeedPrice
                ? leaguePSeedsByRank[PlayerRank_Enum.Gold] * pSeedPrice
                : null
            }
          />

          <Box p={8} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {GoldenLeagueList.map((text: string, index) => (
                <LeagueCardItem key={index} text={text} />
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
            pSeeds={leaguePSeedsByRank[PlayerRank_Enum.Platinum]}
            amountUsd={
              pSeedPrice
                ? leaguePSeedsByRank[PlayerRank_Enum.Platinum] * pSeedPrice
                : null
            }
          />

          <Box p={8} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {PlatinumLeagueList.map((text: string, index) => (
                <LeagueCardItem key={index} text={text} />
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
            pSeeds={leaguePSeedsByRank[PlayerRank_Enum.Diamond]}
            amountUsd={
              pSeedPrice
                ? leaguePSeedsByRank[PlayerRank_Enum.Diamond] * pSeedPrice
                : null
            }
          />

          <Box p={8} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {DiamondLeagueList.map((text: string, index) => (
                <LeagueCardItem key={index} text={text} />
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
          top: 0,
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
            pSeeds={topHodlerPSeeds}
            amountUsd={pSeedPrice != null ? topHodlerPSeeds * pSeedPrice : null}
          />

          <Box p={8} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {No1PatronList.map((text: string, index) => (
                <LeagueCardItem key={index} text={text} />
              ))}
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default PerksGrid;
