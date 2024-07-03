import { Flex, HStack, Image, MetaTheme, Text, Tooltip } from '@metafam/ds';
import { Constants, numbers } from '@metafam/utils';
import SeedMarket from 'assets/seed-icon.svg';
import XPStar from 'assets/xp-star.svg';
import { usePSeedBalance } from 'lib/hooks/balances';

const { amountToDecimal } = numbers;

// Display player XP and Seed
type Props = {
  totalXP: number;
  mobile?: boolean;
};
// Display player XP and Seed
export const XPSeedsBalance: React.FC<Props> = ({ totalXP }) => {
  const { pSeedBalance } = usePSeedBalance();

  return (
    <Flex direction={['column', 'row']}>
      <Tooltip label="Total XP" hasArrow>
        <HStack
          bg="#00000044"
          border={`1px solid ${MetaTheme.colors.purple[700]}`}
          borderRadius="3xl"
          px={4}
          py={1}
          minW="fit-content"
        >
          <Image
            src={XPStar.src}
            alignSelf="center"
            alt="XP"
            boxSize={['1.5rem', '1rem']}
          />
          <Text
            w="full"
            textAlign="right"
            color="#FFF"
            lineHeight={2}
            fontSize={['sm', 'xs']}
            fontWeight="bold"
          >
            {Math.trunc(totalXP).toLocaleString()}
          </Text>
        </HStack>
      </Tooltip>
      <Tooltip label="pSEEDs" hasArrow>
        <HStack
          bg="#00000044"
          border={`1px solid ${MetaTheme.colors.purple[700]}`}
          borderRadius="3xl"
          px={4}
          py={1}
          minW="fit-content"
        >
          <Image
            src={SeedMarket.src}
            alignSelf="center"
            alt="Seed"
            boxSize={['1.5rem', '1rem']}
          />
          <Text
            w="full"
            textAlign="right"
            color="#FFF"
            lineHeight={2}
            fontSize={['sm', 'xs']}
            fontWeight="bold"
          >
            {pSeedBalance?.toFixed(0).toLocaleString() ?? '¿?'}
          </Text>
        </HStack>
      </Tooltip>
    </Flex>
  );
};
