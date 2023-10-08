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
} from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import LinkIcon from './LinkIcon';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  admin?: boolean;
  editLink?: (link: Link) => void;
  onDelete?: () => void;
};
const Links: React.FC<Props> = ({ player, admin, editLink, onDelete }) => {
  const [links, setLinks] = useState<Link[]>(player.links ?? []);
  const [, deleteLink] = useDeletePlayerLinkMutation();
  const toast = useToast();

  useEffect(() => {
    if (player) {
      setLinks(player.links);
    }
  }, [player, player.links]);

  const deleteSingleLink = async (id: string) => {
    const { error } = await deleteLink({ id });

    if (error) {
      const msg = `Unable to delete link: "${error}"`;
      toast({
        title: 'Error deleting link!',
        description: msg,
        status: 'error',
        isClosable: true,
        duration: 8000,
      });
      throw new Error(msg);
    }
    onDelete?.();
  };

  return (
    <VStack mt={4} w="full">
      {links?.map((link) => (
        <Flex
          w="full"
          justifyContent="start"
          alignContent="center"
          gap={4}
          key={link.id}
        >
          <a
            href={link.url || ''}
            target="_blank"
            rel="noreferrer"
            style={{ width: '100%', flex: 1 }}
            role="group"
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
                onClick={() => editLink?.(link)}
              >
                <EditIcon color={'violet'} />
              </Button>

              <Button
                background={'blackAlpha.300'}
                disabled={false}
                onClick={() => deleteSingleLink(link?.id)}
              >
                <DeleteIcon color={'violet'} />
              </Button>
            </Flex>
          )}
        </Flex>
      ))}
    </VStack>
  );
};

export { Links };
