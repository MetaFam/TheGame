import {
  Box,
  EditIcon,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { getPlayerDescription, getPlayerName } from 'utils/playerHelpers';

import { ProfileSection } from '../../ProfileSection';
import { PlayerContacts } from '../PlayerContacts';
import { PlayerBrightId } from './PlayerBrightId';
import { PlayerCollab } from './PlayerCollab';

const MAX_BIO_LENGTH = 240;

type Props = { player: PlayerFragmentFragment; isOwnProfile: boolean };
export const PlayerHero: React.FC<Props> = ({ player, isOwnProfile }) => {
  const description = getPlayerDescription(player);
  const [show, setShow] = React.useState(description.length <= MAX_BIO_LENGTH);

  return (
    <ProfileSection>
      <VStack spacing={8}>
        {isOwnProfile && (
          <Flex width="100%" justifyContent="end">
            <IconButton
              variant="outline"
              aria-label="Edit Profile Info"
              size="lg"
              borderColor="#A426A4"
              background="rgba(17, 17, 17, 0.9)"
              color="#A426A4"
              _hover={{ color: 'white', borderColor: 'white' }}
              icon={<EditIcon />}
              isRound
            />
          </Flex>
        )}
        <PlayerAvatar
          w={{ base: 32, md: 56 }}
          h={{ base: 32, md: 56 }}
          {...{ player }}
        />
        <Box textAlign="center">
          <Text fontSize="xl" fontFamily="heading" mb={1}>
            {getPlayerName(player)}
          </Text>
          <PlayerBrightId {...{ player }} />
        </Box>
        <Box>
          <Text fontSize={{ base: 'sm', sm: 'md' }}>
            {show
              ? description
              : `${description.substring(0, MAX_BIO_LENGTH - 9)}…`}
            {description.length > MAX_BIO_LENGTH && (
              <Text
                as="span"
                fontFamily="body"
                fontSize="xs"
                color="cyanText"
                cursor="pointer"
                onClick={() => setShow((s) => !s)}
                pl={1}
              >
                Read {show ? 'less' : 'more'}
              </Text>
            )}
          </Text>
        </Box>

        <HStack mt={2}>
          <PlayerContacts player={player} />
        </HStack>
        <Box w="100%">
          <PlayerCollab player={player} />
        </Box>
      </VStack>
    </ProfileSection>
  );
};
