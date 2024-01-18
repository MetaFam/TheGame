import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from '@metafam/ds';
import Droplet1 from 'assets/seeds/droplet1.png';
import Droplet2 from 'assets/seeds/droplet2.png';
import SeedsIcon from 'assets/seeds/plant.svg';
import React, { useState } from 'react';

export const Water: React.FC = () => {
  const amounts = [8, 50, 100, 1000, 'Custom amount'];
  const leagues = [
    {
      name: 'Bronze',
      amount: 4,
    },
    {
      name: 'Silver',
      amount: 110,
    },
    {
      name: 'Golden',
      amount: 650,
    },
    {
      name: 'Platinum',
      amount: 1000,
    },
    {
      name: 'Diamond',
      amount: 2800,
    },
  ];

  const [selectedAmount, setSelectedAmount] = useState<string | number>(8);
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };
  const handleSelectAmount = (amount: any) => {
    setSelectedAmount(amount as any);
  };

  const waterWith = (amount: number) => {
    // console.log(amount);
  };

  const calculateHighestReachableLeague = (wateringAmount: number) => {
    if (wateringAmount <= 8) {
      // If the watering amount is $8 or less, it only covers the membership fee
      return { league: 'None', months: Infinity };
    }

    const effectiveAmount = wateringAmount - 8;
    let bestLeague = { league: 'None', months: Infinity };

    leagues.forEach((league) => {
      const months = Math.ceil(league.amount / effectiveAmount);
      if (months <= 3) {
        bestLeague = { league: league.name, months };
      }
    });
    return bestLeague;
  };

  const selectedWateringAmount =
    selectedAmount === 'Custom amount'
      ? Number(customAmount)
      : Number(selectedAmount);
  const { league, months } = calculateHighestReachableLeague(
    selectedWateringAmount,
  );

  return (
    <VStack spacing={4} my={8}>
      <Text>
        Players of MetaGame have been planting their Seeds. Saplings have
        sprouted <br />
        but they need to be watered regularly if we want healthy Trees to grow.
      </Text>
      <Box>
        <Image src={Droplet1.src} alt="Droplet1" mx="auto" my={8} />
        <Image src={Droplet2.src} alt="Droplet2" mx="auto" my={8} mb={16} />
        <Image src={SeedsIcon.src} alt="Seeds" mx="auto" my={8} />
      </Box>

      <HStack spacing={4}>
        <ButtonGroup isAttached variant="outline" borderRadius={8}>
          {amounts.map((amount) => (
            <Button
              key={amount}
              backgroundColor={selectedAmount === amount ? 'cyan.600' : ''}
              color={selectedAmount === amount ? 'blue.900' : 'cyan.500'}
              onClick={() => handleSelectAmount(amount)}
              borderRadius={8}
            >
              {typeof amount === 'number' ? `$${amount}` : amount}
            </Button>
          ))}
        </ButtonGroup>
        {selectedAmount === 'Custom amount' && (
          <Input
            placeholder="Amount"
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            width="100px"
          />
        )}
      </HStack>

      <Link
        href=""
        color="pink.200"
        textAlign="center"
        fontFamily="Exo 2"
        fontSize="16px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="24px"
        textDecoration="underline"
      >
        Enter referral
      </Link>

      <Button
        onClick={() =>
          waterWith(
            selectedAmount === 'Custom amount'
              ? Number(customAmount)
              : Number(selectedAmount),
          )
        }
        borderRadius={8}
        colorScheme="purple"
      >
        Water with $8/month *
      </Button>

      <Text>
        {months === Infinity
          ? `Your current selection only covers the membership fee.`
          : `In ${months} months you will be in the ${league} League.`}
      </Text>

      <Text
        color="var(--blue-300, #A3B8F8)"
        textAlign="center"
        fontFamily="Exo 2"
        fontSize="16px"
        fontStyle="normal"
        fontWeight={400}
        lineHeight="24px"
      >
        * The first $8 goes to cover the membership fee. The rest of the
        selected amount will be returned in tokens.
      </Text>
    </VStack>
  );
};
