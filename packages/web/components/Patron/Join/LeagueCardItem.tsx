import { Flex, Image, Text } from '@metafam/ds';
import CheckMark from 'assets/patron/checkmark.png';

type ItemProps = {
  item: string;
};

export const LeagueCardItem: React.FC<ItemProps> = (props: ItemProps) => (
  <Flex flexDirection="row" justifyContent="space-between">
    <Text color="white" fontSize="sm">
      {props.item}
    </Text>
    <Image src={CheckMark} width="1rem" height="1rem" m={1} />
  </Flex>
);
