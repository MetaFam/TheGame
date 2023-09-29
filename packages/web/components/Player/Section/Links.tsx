import {
  Box,
  Button,
  DeleteIcon,
  EditIcon,
  Flex,
  Text,
  useToast,
  VStack,
} from '@metafam/ds';
import {
  Link,
  Player,
  useDeletePlayerLinkMutation,
  useGetPlayerLinksNoCacheMutation,
} from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import LinkIcon from './LinkIcon';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  admin?: boolean;
  switchToEdit?: any;
  onClose?: any;
};

export const Links: React.FC<Props> = ({
  player,
  admin,
  switchToEdit,
  onClose,
}) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [, deleteLink] = useDeletePlayerLinkMutation();
  const toast = useToast();
  const [, getPlayerLinks] = useGetPlayerLinksNoCacheMutation();

  useEffect(() => {
    if (!player?.id) return;
    (async () => {
      const now = new Date().toISOString();
      getPlayerLinks({ playerId: player.id, updatedAt: now }).then((res) => {
        setLinks(res?.data?.update_player?.returning[0].links || []);
      });
    })();
  }, [player.id, admin, getPlayerLinks]);

  const deleteSingleLink = async (id: string) => {
    const { error } = await deleteLink({ id });

    if (error) {
      toast({
        title: 'Error deleting link!',
        description:
          'Oops! We were unable to delete this link. Please try again.',
        status: 'error',
        isClosable: true,
        duration: 8000,
      });
      throw new Error(`Unable to delete link. Error: ${error}`);
    } else {
      toast({
        title: 'Link deleted successfully!',
        description:
          'The link was successfully deleted! Please refresh the page to see the changes.',
        status: 'success',
        isClosable: true,
        duration: 8000,
      });
    }
    if (admin) {
      onClose();
    }
  };

  return (
    <VStack mt={4} w="full">
      {links?.map((link) => (
        <Flex w="full" justifyContent="start" alignContent="center" gap={4}>
          <a
            href={link?.url || ''}
            target="_blank"
            rel="noreferrer"
            style={{ width: '100%', flex: 1 }}
            role="group"
            key={link?.id}
          >
            <Flex
              justifyContent="start"
              alignContent="center"
              color={'violet'}
              width={'full'}
              px={4}
              py={3}
              background={'blackAlpha.300'}
              transition={'ease-in-out'}
              transitionDuration={'300'}
              _hover={{
                background: 'blackAlpha.500',
              }}
              _active={{
                background: 'blackAlpha.700',
              }}
              rounded={'md'}
            >
              <LinkIcon type={link?.type} />
              <Text mx="auto" fontWeight={600}>
                {link?.name}
              </Text>
              <Box
                my="auto"
                mr={1}
                opacity={0}
                _groupHover={{ opacity: 0.8 }}
                _groupActive={{ opacity: 1 }}
              >
                <FaExternalLinkAlt fill="currentColor" />
              </Box>
            </Flex>
          </a>
          {admin && (
            <Flex alignItems="center" gap={2}>
              <Button
                background={'blackAlpha.300'}
                disabled={false}
                onClick={() => deleteSingleLink(link?.id)}
              >
                <DeleteIcon color={'violet'} />
              </Button>

              <Button
                background={'blackAlpha.300'}
                onClick={() => switchToEdit('edit', link)}
              >
                <EditIcon color={'violet'} />
              </Button>
            </Flex>
          )}
        </Flex>
      ))}
    </VStack>
  );
};
