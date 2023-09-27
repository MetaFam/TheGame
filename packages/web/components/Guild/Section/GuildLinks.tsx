import {
  Box,
  ChainIcon,
  Flex,
  Heading,
  IconButton,
  Button,
  DeleteIcon,
  MetaTileLinkWrapper,
  Text,
  VStack,
  Wrap,
  WrapItem,
  EditIcon,
  MetaButton,
  useToast,
} from '@metafam/ds';
import LinkIcon from 'components/Player/Section/LinkIcon';
import { LinkGuild } from 'components/Player/PlayerGuild';
import { ProfileSection } from 'components/Section/ProfileSection';
import {
  GuildFragment,
  useGetAdministeredGuildsQuery,
  useDeleteGuildLinkMutation,
} from 'graphql/autogen/types';

import { getGuildLinks } from 'graphql/queries/guild';

import React, { useMemo, useState, useEffect } from 'react';
import {
  FaDiscord,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaHome,
  FaTwitter,
} from 'react-icons/fa';
import { BoxTypes } from 'utils/boxTypes';
import { getDAOLink } from 'utils/daoHelpers';
import { useUser } from 'lib/hooks';
import { AddGuildLink, GuildLinkFormInputs } from './Links/AddGuildLink';
import { EditGuildLink } from './Links/EditGuildLink';


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
  const [links, setLinks] = useState<any[]>([]);
  const [editView, setEditView] = useState(false);
  const [addView, setAddView] = useState(false);
  const [editId, setEditId] = useState<string>('');
  const [linkToEdit, setLinkToEdit] = useState<GuildLinkFormInputs>();
  const [, deleteLink] = useDeleteGuildLinkMutation();
  const toast = useToast();

  const handleResetView = () => {
    setAddView(false)
    setEditView(false)
  }

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
  };

  useEffect(() => {
    if (!guild?.id) return;
    (async () => {
      getGuildLinks(guild.id).then((data) => {
        setLinks(data?.link || []);
      });
    })();
  }, [guild?.id]);

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
            onClick={() => toggleEditLinks(!editLinks)}
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
      
      <VStack mt={4} w="full">
        {!editView && !addView && links?.map((link) => (
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
            {editLinks && (
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
                  onClick={() => {
                    setEditView(true)
                    setEditId(link?.id)
                    setLinkToEdit({
                      name: link.name,
                      url: link.url,
                      type: link.type
                    })
                  }}
                >
                  <EditIcon color={'violet'} />
                </Button>
              </Flex>
            )}
            
          </Flex>
        ))}
        {addView && !editView && <AddGuildLink guildId={guild?.id} onClose={handleResetView} />}
        {editView && !addView && linkToEdit && <EditGuildLink onClose={handleResetView} editId={editId} linkToEdit={linkToEdit} />}
        {canAdministerGuild && !addView && editLinks && !editView &&
          <MetaButton
            mt='1em'
            bg="purple.500"
            onClick={() => setAddView(!addView)}
          >
            Add Link
          </MetaButton>
        }
      </VStack>
      <Wrap justify="space-between" w="full" spacing={4} mb={2}>
        {guild.daos?.map((dao, index) => {
          const daoURL =
            dao.url || getDAOLink(dao.network, dao.contractAddress);

          return (
            <WrapItem key={index}>
              <LinkGuild {...{ daoURL }} guildname={null}>
                <Flex align="center" py={2} gap={2}>
                  <Box bg="purpleBoxLight" minW={12} h={12} borderRadius={8}>
                    <ChainIcon chain={dao.network} boxSize={12} p={2} />
                  </Box>
                  <Heading
                    fontWeight="bold"
                    sx={{
                      textIndent: [0, '-1em'],
                      fontVariant: 'small-caps',
                    }}
                    fontSize="xs"
                    color={daoURL ? 'cyanText' : 'white'}
                    ml={[0, '1em']}
                    textAlign={['center', 'left']}
                    flexGrow={1}
                  >
                    {dao.label ?? (
                      <Text as="span">
                        Unknown{' '}
                        <Text as="span" textTransform="capitalize">
                          {dao.network}
                        </Text>{' '}
                        DAO
                      </Text>
                    )}
                  </Heading>
                </Flex>
              </LinkGuild>
            </WrapItem>
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
      url: guild.websiteUrl,
      label: 'Website',
      icon: <FaGlobe />,
    },
    {
      url: guild.discordInviteUrl,
      label: 'Discord Server',
      icon: <FaDiscord />,
    },
    {
      url: guild.githubUrl,
      label: 'Github',
      icon: <FaGithub />,
    },
    {
      url: guild.twitterUrl,
      label: 'Twitter',
      icon: <FaTwitter />,
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
          {guild.websiteUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.websiteUrl)
                    window?.open(guild.websiteUrl, '_blank')?.focus();
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
          {guild.discordInviteUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.discordInviteUrl)
                    window?.open(guild.discordInviteUrl, '_blank')?.focus();
                }}
                aria-label="Discord Server"
                icon={<FaDiscord />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
          {guild.githubUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.githubUrl)
                    window?.open(guild.githubUrl, '_blank')?.focus();
                }}
                aria-label="Github"
                icon={<FaGithub />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
          {guild.twitterUrl ? (
            <MetaTileLinkWrapper>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (guild.twitterUrl)
                    window?.open(guild.twitterUrl, '_blank')?.focus();
                }}
                aria-label="Twitter"
                icon={<FaTwitter />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          ) : null}
        </Wrap>
      )}
    </Wrap>
  );
};
