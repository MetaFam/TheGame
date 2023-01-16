import { Flex, Text, Tooltip } from '@metafam/ds';
import { Maybe } from '@metafam/utils';

type Props = {
  title: string;
  count: number | string;
  pSeeds: number;
  amountUsd: Maybe<number>;
};

export const PerksHeader = ({ title, count, pSeeds, amountUsd }: Props) => {
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
      Current req: {amountLabel}
    </Text>
  );
  if (amountUsd != null) {
    amountDisplay = <Tooltip label={pSeedLabel}>{amountDisplay}</Tooltip>;
  }
  return (
    <Flex
      alignItems="baseline"
      direction={{ base: 'column', sm: 'row' }}
      justify="space-between"
      px={6}
      paddingTop={6}
      width="100%"
    >
      <Flex alignItems="baseline">
        <Text
          color="white"
          fontSize="md"
          fontWeight="bold"
          mr={{
            base: '2',
            md: '4',
          }}
          textTransform="uppercase"
        >
          {title}
        </Text>
        <Text color="landing450" fontSize="sm" whiteSpace="nowrap">
          {typeof count === 'number'
            ? `(total of ${count.toLocaleString()})`
            : `(${count})`}
        </Text>
      </Flex>
      {amountDisplay}
    </Flex>
  );
};
