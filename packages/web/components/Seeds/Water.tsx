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
import SeedsIcon from 'assets/seeds/plant.svg';
import WaterDrops1 from 'assets/seeds/WaterDrops1.png';
import WaterDrops2 from 'assets/seeds/WaterDrops2.png';
import WaterDrops3 from 'assets/seeds/WaterDrops3.png';
import WaterDrops4 from 'assets/seeds/WaterDrops4.png';
import WaterDrops5 from 'assets/seeds/WaterDrops5.png';
import React, { useEffect, useState } from 'react';
import { GoLinkExternal } from 'react-icons/go';

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

  const waterDropsToDisplay = (amount: number) => {
    if (amount <= 8) {
      return WaterDrops1;
    }
    if (amount <= 50) {
      return WaterDrops2;
    }
    if (amount <= 100) {
      return WaterDrops3;
    }
    if (amount <= 1000) {
      return WaterDrops4;
    }
    return WaterDrops5;
  };
  const [selectedAmount, setSelectedAmount] = useState<string | number>(8);

  const [imageSrc, setImageSrc] = useState(waterDropsToDisplay(8).src);
  const [loading, setLoading] = useState(false);

  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };
  const handleSelectAmount = (amount: any) => {
    setSelectedAmount(amount as any);
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

  useEffect(() => {
    const newSrc = waterDropsToDisplay(
      selectedAmount === 'Custom amount'
        ? Number(customAmount)
        : Number(selectedAmount),
    ).src;

    if (newSrc !== imageSrc) {
      setLoading(true);
      setTimeout(() => {
        setImageSrc(newSrc);
        setLoading(false);
      }, 300);
    }
  }, [selectedAmount, customAmount, imageSrc]);

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
        <Image
          src={imageSrc}
          alt="Droplet"
          mx="auto"
          my={8}
          mb={16}
          style={{
            transition: 'opacity 300ms', // Fade-in/out transition
            opacity: loading ? 0 : 1, // Control opacity
          }}
        />
        <Image src={SeedsIcon.src} alt="Seeds" mx="auto" my={8} />
      </Box>

      <HStack spacing={4}>
        <ButtonGroup isAttached variant="outline" borderRadius={8}>
          {amounts.map((amount) => (
            <Button
              size={{
                base: 'sm',
                sm: 'md',
              }}
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

      {/* <Link
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
      </Link> */}

      <Button
        as={Link}
        href="https://checkout.superfluid.finance/QmfTXxap8ayojDufpcvSaDHNC43qEYV8Whio6JZ7r8x1PM"
        target="_blank"
        borderRadius={8}
        colorScheme="purple"
        rightIcon={<GoLinkExternal />}
      >
        Water with $
        {selectedAmount === 'Custom amount' ? customAmount : selectedAmount}
        /month *
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
        * The first $8 goes to cover the membership fee. <br />
        The rest of the selected amount will be returned in tokens.
      </Text>
    </VStack>
  );
};
