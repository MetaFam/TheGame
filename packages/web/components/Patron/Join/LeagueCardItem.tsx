import { Flex, Image, Text } from '@metafam/ds';
import CheckMark from 'assets/patron/checkmark.webp';


type ItemProps = {
  text: string;
};

export const LeagueCardItem: React.FC<ItemProps> = ({ text }: ItemProps) => (
  <Flex
    width="100%"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Text fontSize="md" lineHeight={1.3}>
      {text}
    </Text>
    <Image
      src={CheckMark.src}
      width="1.5rem"
      height="1.5rem"
      marginLeft={2}
      my={1}
    />
  </Flex>
);
