import {
  AddIcon,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@metafam/ds';
import { UnverifiedGuildForm } from 'components/Guild/UnverifiedGuildForm';
import { GuildSearchBar } from 'components/GuildSearchBar';
import { Player, useAddUnverifiedGuildMutation } from 'graphql/autogen/types';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { GuildListingSmall, SmallGuild } from './GuildListing';

export const AddPlayerGuild: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  hydratePlayer: () => void;
}> = ({ isOpen, onClose, player, hydratePlayer }) => {
  const [showGuildForm, setShowGuildForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [currentGuilds, setCurrentGuilds] = useState<SmallGuild[]>([]);
  const [, addUnverifiedGuild] = useAddUnverifiedGuildMutation();

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent>
        {(!showSearchForm || currentGuilds.length > 0) && !showGuildForm && (
          <Button
            w={{ base: '50%', lg: '20%' }}
            mt={6}
            bg="#00000029"
            color="#D59BD5"
            _hover={{ bg: '#00000029' }}
            leftIcon={<FaArrowLeft />}
            onClick={() => setShowSearchForm(true)}
          >
            Back to search
          </Button>
        )}
        <ModalHeader>
          {!showSearchForm &&
            currentGuilds.length > 0 &&
            !showGuildForm &&
            'New Guild Added!'}
          {(showGuildForm || (!currentGuilds.length && !showSearchForm)) &&
            'Create New Guild'}
          {(showSearchForm || (!currentGuilds.length && !showGuildForm)) &&
            'Search for a Guild'}
          <Text
            fontStyle="italic"
            color="gray.400"
            textAlign="center"
            fontSize="md"
            mt={3}
            mb={10}
          >
            {currentGuilds.length > 0 &&
              !showSearchForm &&
              !showGuildForm &&
              'Your membership has been added to your guild info.'}
            {(showSearchForm || showGuildForm) && 'Add Guild Membership'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={[0, 6]}>
          {!showGuildForm &&
            !showSearchForm &&
            currentGuilds.length > 0 &&
            currentGuilds.map((guild) => (
              <Box w="50%" mx="auto">
                <GuildListingSmall key={guild.id} {...guild} />
              </Box>
            ))}
          {showGuildForm && (
            <UnverifiedGuildForm
              onSubmit={async (...args) => {
                const ret = await addUnverifiedGuild(...args);
                if (ret.data) {
                  setCurrentGuilds([
                    ...currentGuilds,
                    {
                      ...ret.operation.variables,
                      id: ret.data.insert_guild?.returning[0].id,
                    },
                  ]);
                  setShowGuildForm(false);
                }
                // if (!ret.error) onClose();
                return ret;
              }}
              {...{ player, hydratePlayer }}
            />
          )}
          {showSearchForm && <GuildSearchBar {...{ player }} />}
          {!showGuildForm && (
            <Button
              variant="outline"
              w={{ base: '50%', lg: '20%' }}
              mt={6}
              ml={{ base: '20%', lg: '40%' }}
              leftIcon={<AddIcon />}
              onClick={() => {
                setShowGuildForm(true);
                setShowSearchForm(false);
              }}
            >
              {currentGuilds.length > 0 ? 'Add another guild' : 'Add New Guild'}
            </Button>
          )}
        </ModalBody>
        {!currentGuilds.length && (
          <ModalFooter mt={6} justifyContent="center">
            <Button
              variant="ghost"
              onClick={onClose}
              color="landing450"
              _hover={{ bg: '#FFFFFF11' }}
              _active={{ bg: '#FF000011' }}
            >
              Go Back to Profile
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
