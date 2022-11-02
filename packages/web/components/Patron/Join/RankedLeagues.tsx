import { Box, Container, Flex, Heading, Text, VStack } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { LeagueCardItem } from 'components/Patron/Join/LeagueCardItem';
import { PerksCard } from 'components/Patron/Join/PerksCard';
import { PerksHeader } from 'components/Patron/Join/PerksHeader';
import { PlayerRank_Enum, TokenBalancesFragment } from 'graphql/autogen/types';
import {
  getLeagueCount,
  getLeagueCutoff,
  getPatronPSeedHoldings,
  MIN_PATRON_PSEEDS,
  NUM_PATRONS,
  PATRON_RANKS,
} from 'utils/patronHelpers';

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
const GoldLeagueList = [
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

const PerksList = [
  {
    title: 'Bronze League',
    list: BronzeLeagueList,
    rank: PlayerRank_Enum.Bronze,
  },
  {
    title: 'Silver League',
    list: SilverLeagueList,
    rank: PlayerRank_Enum.Silver,
  },
  {
    title: 'Gold League',
    list: GoldLeagueList,
    rank: PlayerRank_Enum.Gold,
  },
  {
    title: 'Platinum League',
    list: PlatinumLeagueList,
    rank: PlayerRank_Enum.Platinum,
  },
  {
    title: 'Diamond League',
    list: DiamondLeagueList,
    rank: PlayerRank_Enum.Diamond,
  },
];

type PerkType = {
  title: string;
  list: string[];
  rank: PlayerRank_Enum;
};

type Props = {
  pSeedPrice: Maybe<number>;
  pSeedHolders: TokenBalancesFragment[];
};

export const RankedLeagues: React.FC<Props> = ({
  pSeedPrice,
  pSeedHolders,
}) => {
  const leaguePSeedsByRank: { [rank: string]: number } = {};
  PATRON_RANKS.forEach((rankEnum) => {
    leaguePSeedsByRank[rankEnum] = getLeagueCutoff(rankEnum, pSeedHolders);
  });
  const topHodlerPSeeds = getPatronPSeedHoldings(pSeedHolders[0]);
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

      <VStack>
        <Flex justify="center">
          <Box p="4" maxW="45rem" className="mg-patron-join-card-bg">
            <Text>
              The total number of Patrons in Phase I is limited to 150. The rank
              requirements are subject to change based on top 150 pSeed hodlors
              &amp; most perks (besides seasonal) will only be unlocked in the
              transition to Phase II — set for Q3 2023.
            </Text>
          </Box>
        </Flex>
        <Flex pt={'2'}>
          <Text fontSize={'4xl'}>👇</Text>
        </Flex>
      </VStack>

      <Flex mb={'6'} direction={'column'} align={'center'}>
        <PerksCard
          title={'All Patrons'}
          list={AllPatronsList}
          count={NUM_PATRONS}
          pSeeds={MIN_PATRON_PSEEDS}
          amountUsd={pSeedPrice ? MIN_PATRON_PSEEDS * pSeedPrice : null}
        />
        {PerksList.map((perk: PerkType) => (
          <PerksCard
            key={perk.title}
            {...perk}
            count={getLeagueCount(perk.rank)}
            pSeeds={leaguePSeedsByRank[perk.rank]}
            amountUsd={
              pSeedPrice ? leaguePSeedsByRank[perk.rank] * pSeedPrice : null
            }
          />
        ))}
        <Box
          className={'mg-patron-join-card-bg'}
          borderRadius={8}
          width={{ base: '100%', md: 'lg' }}
          my={2}
          p={4}
        >
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            ...aaand for the one &amp; only 👇
          </Text>
        </Box>

        <Box
          className={'mg-patron-join-card-bg'}
          borderRadius={8}
          maxW="2xl"
          my={4}
        >
          <PerksHeader
            title={'No. 1 Patron of MetaGame’s Seed Phase'}
            count={'unique'}
            pSeeds={topHodlerPSeeds}
            amountUsd={pSeedPrice != null ? topHodlerPSeeds * pSeedPrice : null}
          />
          <Box p={4} width="100%" color="white">
            <Flex width="100%" flexDirection="row" flexWrap="wrap">
              {No1PatronList.map((text: string, index: number) => (
                <LeagueCardItem key={index} text={text} />
              ))}
            </Flex>
          </Box>
        </Box>

        <Box
          className={'mg-patron-join-card-bg'}
          borderRadius={8}
          maxW="2xl"
          my={2}
          p={4}
        >
          <Text fontWeight="light" fontSize="lg" textAlign="center">
            Note: Yes, you get what the previous league gets + your own league
            perks!
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};
