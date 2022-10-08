import { Flex, Image, Text } from '@metafam/ds';
import CheckMark from 'assets/patron/checkmark.png';

type ItemProps = {
  text: string;
};

export const LeagueCardItem: React.FC<ItemProps> = ({ text }: ItemProps) => (
  <Flex width="100%" flexDirection="row" justifyContent="space-between">
    <Text color="white" fontSize="sm">
      {text}
    </Text>
    <Image src={CheckMark} width="1rem" height="1rem" m={1} />
  </Flex>
);
