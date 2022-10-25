import { Box, Flex } from '@metafam/ds';
import { LeagueCardItem } from 'components/Patron/Join/LeagueCardItem';
import { PerksHeader } from 'components/Patron/Join/PerksHeader';

export const PerksCard: React.FC<any> = ({
  title,
  list,
  count,
  pSeeds,
  amountUsd,
}) => (
  <Flex
    direction="column"
    className={'mg-patron-join-card-bg'}
    borderRadius={8}
    maxW="lg"
    m={4}
  >
    <PerksHeader
      title={title}
      count={count}
      pSeeds={pSeeds}
      amountUsd={amountUsd}
    />
    <Box p={4} width="100%" color="white">
      <Flex width="100%" flexDirection="row" flexWrap="wrap">
        {list.map((text: string, index: number) => (
          <LeagueCardItem key={index} text={text} />
        ))}
      </Flex>
    </Box>
  </Flex>
);
