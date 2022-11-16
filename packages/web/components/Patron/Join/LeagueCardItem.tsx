import { Flex, Image, Text } from '@metafam/ds';
import CheckMark from 'assets/patron/checkmark.png';
import React from 'react';

type ItemProps = {
  text: string;
};

export const LeagueCardItem: React.FC<ItemProps> = ({ text }: ItemProps) => (
  <Flex width="100%" flexDirection="row" justifyContent="space-between">
    <Text color="white" fontSize="lg" fontWeight="light">
      {text}
    </Text>
    <Image src={CheckMark.src} width="1.75rem" height="1.75rem" m={1} />
  </Flex>
);
