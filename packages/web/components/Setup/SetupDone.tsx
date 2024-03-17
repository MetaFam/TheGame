import {
  HStack,
  MetaButton,
  MetaHeading,
  Stack,
  Text,
  useToast,
} from '@metafam/ds';
import { ConnectToProgress, MetaGameLogo } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { PlayerTile } from 'components/Player/PlayerTile';
import { useUser, useWeb3 } from 'lib/hooks';

export const SetupDone: React.FC = () => {
  const { user } = useUser();
  const { connected } = useWeb3();
  const toast = useToast();

  if (!user || !connected) {
    return (
      <FlexContainer my="auto">
        <ConnectToProgress showSwitchButton={false} />
      </FlexContainer>
    );
  }

  return (
    <FlexContainer flex={1} mb={8}>
      <MetaGameLogo />
      <MetaHeading mb={10}>Game On!</MetaHeading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={8}
        justify="center"
        align="center"
      >
        <PlayerTile player={user} />
        <Stack spacing={4} p={4} maxW="25rem" fontSize="md" h="100%">
          <Text fontSize="lg">
            Congrats on your MyMeta, you'll love the customization options!
          </Text>
          <Text fontSize="md">
            But for now - plug yourself into MetaGame, we look forward to
            meeting you! 🤗
          </Text>
          <HStack>
            <MetaButton
              bg="#00000000"
              border="1px solid #5A32E6"
              onClick={() => {
                if (!navigator.clipboard) {
                  return;
                }
                navigator.clipboard.writeText(`${window.location.href}`);
                toast({
                  title: 'Copied to clipboard!',
                  description: 'Share this link with your friends!',
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              Share
            </MetaButton>

            <MetaLink href="/academy/rite-of-passage">
              <MetaButton>Proceed</MetaButton>
            </MetaLink>
          </HStack>
        </Stack>
      </Stack>
    </FlexContainer>
  );
};
