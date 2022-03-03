import { Button, Text } from '@metafam/ds';
import { useRouter } from 'next/router';

export const StartButton: React.FC<{ text: string }> = ({
  text = 'Start Playing',
}) => {
  const router = useRouter();

  return (
    <Button
      className="border-grad"
      colorScheme="white"
      rounded="md"
      size="lg"
      onClick={() => router.push('/start')}
    >
      <Text as="span">{text}</Text>
    </Button>
  );
};
