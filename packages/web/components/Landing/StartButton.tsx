import { Button, Text } from '@metafam/ds';
import { useRouter } from 'next/router';

export const StartButton: React.FC<{ text: string }> = ({
  text = 'Start Playing',
}) => {
  const router = useRouter();

  return (
    <Button
      className="screen-esque"
      background="landing150"
      colorScheme="white"
      rounded="md"
      size="lg"
      minW="7rem"
      onClick={() => router.push('/start')}
    >
      <Text as="span">{text}</Text>
    </Button>
  );
};
