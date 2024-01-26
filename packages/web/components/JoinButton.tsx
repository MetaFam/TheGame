import { Button } from '@metafam/ds';
import { MetaLink } from 'components/Link';


export const JoinButton: React.FC<{ text: string }> = ({
  text = 'Join Us',
}) => (
  <MetaLink _hover={{}} href="/join">
    <Button className="border-grad" colorScheme="white" rounded="md" size="lg">
      {text}
    </Button>
  </MetaLink>
);
