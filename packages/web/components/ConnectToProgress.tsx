import {
  Box,
  chakra,
  Flex,
  Image,
  MetaButton,
  Stack,
  Text,
  Tooltip,
} from '@metafam/ds';
import cursiveTitle from 'assets/cursive-title-small.png';
import discord from 'assets/discord.svg';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { useWeb3 } from 'lib/hooks';

export const ConnectToProgress: React.FC = () => {
  const { connect, connecting, connected } = useWeb3();
  return (
    <Stack color="white" align="center" spacing={8}>
      <Image w="100%" maxW="25rem" src={cursiveTitle} mb="4rem" />
      <Box align="center">
        {connecting || !connected ? (
          <MetaButton onClick={connect} px={[8, 12]} isLoading={connecting}>
            Connect To Progress
          </MetaButton>
        ) : (
          <Text fontSize="xl">
            Please switch to <SwitchNetworkButton /> to progress
          </Text>
        )}
      </Box>
      <Flex justify="center">
        <Tooltip label="Join Our Discord" hasArrow>
          <MetaButton
            as="a"
            target="_blank"
            href="//discord.gg/metagame"
            p={3}
            mr={5}
            sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
          >
            <Image src={discord} boxSize={6} mr={1.5} /> Get Help
          </MetaButton>
        </Tooltip>
        <Tooltip label="Read Our Wiki" hasArrow>
          <MetaButton
            as="a"
            target="_blank"
            href="//wiki.metagame.wtf"
            p={3}
            sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
          >
            <chakra.span fontSize="150%">📚</chakra.span> Learn More
          </MetaButton>
        </Tooltip>
      </Flex>
    </Stack>
  );
};
