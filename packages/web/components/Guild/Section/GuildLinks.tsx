import {
  Box,
  Button,
  DeleteIcon,
  EditIcon,
  Flex,
  IconButton,
  MetaButton,
  MetaTileLinkWrapper,
  Text,
  useToast,
  VStack,
  Wrap,
} from '@metafam/ds';
import LinkIcon from 'components/Player/Section/LinkIcon';
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  GuildFragment,
  LinkType_Enum,
  useDeleteGuildLinkMutation,
  useGetAdministeredGuildsQuery,
  useGetGuildLinksNoCacheMutation,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';

import { AddGuildLink } from './Links/AddGuildLink';
import { EditGuildLink, GuildLink, GuildLinkList } from './Links/EditGuildLink';

type Props = {
  guild: GuildFragment;
  editing: boolean;
};

export const linkButtonProps = {
  variant: 'outline',
  size: 'lg',
  colorScheme: 'blackAlpha',
  _hover: {
    color: 'white',
    bgColor: 'blackAlpha.500',
  },
};

export const GuildLinks: React.FC<Props> = ({ guild, editing }) => {
  const [editLinks, toggleEditLinks] = useState(false);
  const [links, setLinks] = useState<GuildLinkList>([]);
  const [editView, setEditView] = useState(false);
  const [addView, setAddView] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState<GuildLink>();
  const [, deleteLink] = useDeleteGuildLinkMutation();
  const [, getGuildLinks] = useGetGuildLinksNoCacheMutation();
  const [resetState, triggerResetState] = useState(false);
  const toast = useToast();

  const handleResetView = () => {
    setAddView(false);
    setEditView(false);
    triggerResetState(!resetState);
  };

  const { user } = useUser();

  const [
    { data: administeredGuildsData, fetching: loadingAdministeredGuilds },
  ] = useGetAdministeredGuildsQuery({
    variables: { id: user?.id },
  });

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
    }
  };

  useEffect(() => {
    if (!guild?.id) return;
    (async () => {
      const now = new Date().toISOString();
      getGuildLinks({ guildId: guild.id, updatedAt: now }).then((res) => {
        setLinks(res?.data?.update_guild?.returning[0].links || []);
      });
    })();
  }, [guild?.id, resetState, getGuildLinks]);

  const administeredGuilds = administeredGuildsData?.guild_metadata;

  const canAdministerGuild = useMemo(
    () =>
      !!user &&
      !loadingAdministeredGuilds &&
      !!administeredGuilds &&
      administeredGuilds.some(
        (guildMetadata) => guildMetadata.guildId === guild?.id,
      ),
    [user, loadingAdministeredGuilds, administeredGuilds, guild],
  );

  return (
    <ProfileSection
      title="Social"
      type={BoxTypes.GUILD_LINKS}
      editing={editing}
    >
      {canAdministerGuild && !editing && (
        <Box pos="absolute" right={2} top={2}>
          <Button
            _hover={{ textDecoration: 'none' }}
            bg={'000000000'}
            onClick={() => {
              toggleEditLinks(!editLinks);
              handleResetView();
            }}
          >
            <IconButton
              aria-label="Edit Profile Info"
              size="lg"
              background="transparent"
              color="pinkShadeOne"
              icon={<EditIcon />}
              _hover={{ color: 'white' }}
              _focus={{ boxShadow: 'none' }}
              _active={{ transform: 'scale(0.8)' }}
              isRound
            />
          </Button>
        </Box>
      )}

      <VStack mt={4} w="full" key={`links-${links.length}`}>
        {!editView &&
          !addView &&
          links?.map((link, i) => (
            <Flex
              w="full"
              justifyContent="start"
              alignContent="center"
              gap={4}
              key={`guild-link-${i}`}
            >
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
              {editLinks && (
                <Flex alignItems="center" gap={2}>
                  <Button
                    background={'blackAlpha.300'}
                    disabled={false}
                    onClick={async () => {
                      await deleteSingleLink(link?.id);
                      triggerResetState(!resetState);
                    }}
                  >
                    <DeleteIcon color={'violet'} />
                  </Button>

                  <Button
                    background={'blackAlpha.300'}
                    onClick={() => {
                      setEditView(true);
                      setLinkToEdit(link);
                    }}
                  >
                    <EditIcon color={'violet'} />
                  </Button>
                </Flex>
              )}
            </Flex>
          ))}
        {addView && !editView && (
          <AddGuildLink guildId={guild?.id} onClose={handleResetView} />
        )}
        {editView && !addView && linkToEdit && (
          <EditGuildLink onClose={handleResetView} {...{ linkToEdit }} />
        )}
        {canAdministerGuild && !addView && editLinks && !editView && (
          <MetaButton
            mt="1em"
            bg="purple.500"
            onClick={() => setAddView(!addView)}
          >
            Add Link
          </MetaButton>
        )}
      </VStack>
      <Wrap justify="space-between" w="full" spacing={4} mb={2}>
        {guild.daos?.map((dao, index) => {
          const daoURL =
            dao.url || getDAOLink(dao.network, dao.contractAddress);

          return (
            <Flex
              w="full"
              justifyContent="start"
              alignContent="center"
              gap={4}
              key={`guild-link-${index}`}
              mt={4}
            >
              <a
                href={daoURL || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%', flex: 1 }}
                role="group"
                key={`dao-link-${index}`}
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
                  <LinkIcon type={'OTHER' as LinkType_Enum} />
                  <Text mx="auto" fontWeight={600}>
                    DAOhaus
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
            </Flex>
          );
        })}
      </Wrap>
    </ProfileSection>
  );
};

type GuildLinkSmall = {
  guild: GuildFragment;
};

export const GuildLinksSmall: React.FC<GuildLinkSmall> = ({ guild }) => {
  const mediaLinks = [
    {
      url: guild.websiteURL,
      label: 'Website',
      icon: <FaGlobe />,
    },
  ];
  const hasIconLink = mediaLinks.reduce(
    (acc, link) => acc || !!link.url,
    false,
  );

  return (
    <Wrap>
      {hasIconLink && (
        <Wrap mb={4}>
          {guild.websiteURL ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.websiteURL)
                    window?.open(guild.websiteURL, '_blank')?.focus();
                }}
                aria-label="Discord Server"
                icon={<FaGlobe />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
              Website
            </MetaTileLinkWrapper>
          ) : null}
        </Wrap>
      )}
    </Wrap>
  );
};
