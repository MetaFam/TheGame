import { Flex, Text, Tooltip } from '@metafam/ds';
import { Maybe } from '@metafam/utils';

type PerksProps = {
  title: string;
  count: number | string;
  pSeeds: number;
  amountUsd: Maybe<number>;
};

export const PerksHeader = ({
  title,
  count,
  pSeeds,
  amountUsd,
}: PerksProps) => {
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
      p="4"
      roundedTop="lg"
      width="100%"
    >
      <Flex align="center">
        <Text color="white" fontWeight="bold" mr={8}>
          {title}
        </Text>
        <Text color="landing450" fontSize="sm" fontWeight="bold">
          {typeof count === 'number'
            ? `(total of ${count.toLocaleString()})`
            : `(${count})`}
        </Text>
      </Flex>
      {amountDisplay}
    </Flex>
  );
};
