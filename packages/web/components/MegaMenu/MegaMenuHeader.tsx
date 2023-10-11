import {
  Avatar,
  Box,
  BoxedNextImage as Image,
  BoxProps,
  CloseIcon,
  ExternalLinkIcon,
  Flex,
  HamburgerIcon,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  MetaButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@metafam/ds';
import { httpLink, Maybe } from '@metafam/utils';
import LogoImage from 'assets/logo.webp';
import SearchIcon from 'assets/search-icon.svg';
import { MetaLink } from 'components/Link';
import { DesktopNavLinks } from 'components/MegaMenu/DesktopNavLinks';
import { DesktopPlayerStats } from 'components/MegaMenu/DesktopPlayerStats';
import { GuildFragment, Player, PlayerFragment } from 'graphql/autogen/types';
import { searchPlayers } from 'graphql/getPlayers';
import { searchGuilds } from 'graphql/queries/guild';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import React, {
  FormEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { distinctUntilChanged, forkJoin, from, Subject } from 'rxjs';
import { debounceTime, filter, shareReplay, switchMap } from 'rxjs/operators';
import { menuIcons } from 'utils/menuIcons';
import { MenuSectionLinks } from 'utils/menuLinks';
import {
  getPlayerImage,
  getPlayerName,
  getPlayerURL,
  getPlayerUsername,
} from 'utils/playerHelpers';

type LogoProps = {
  link: string;
} & BoxProps;

const Logo: React.FC<LogoProps> = ({ link, ...props }) => {
  const w = useBreakpointValue({ base: 9, lg: 10 }) ?? 9;
  const h = useBreakpointValue({ base: 12, lg: 14 }) ?? 12;

  return (
    <Box {...props}>
      <MetaLink
        href={link}
        _focus={{ outline: 'none', bg: 'transparent' }}
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
      >
        <Image
          src={LogoImage}
          transition="0.25s"
          {...{ w, h }}
          _hover={{ transform: 'scale(1.1)' }}
        />
      </MetaLink>
    </Box>
  );
};

interface OptionProps {
  text: string;
  name: string;
  image?: string;
  onClick: () => void;
}

const Option = ({ onClick, name, image, text }: OptionProps) => (
  <Box {...{ onClick }} as="li" role="option" sx={{ listStyleType: 'none' }}>
    <Flex
      _hover={{
        background: 'rgba(0,0,0,0.56)',
      }}
      align="center"
      px={3}
      py={2}
      cursor="pointer"
      rounded="lg"
    >
      <Avatar
        name={name}
        src={httpLink(image)}
        w={6}
        h={6}
        sx={{
          '& > div': {
            fontSize: 'xs',
          },
        }}
      />
      <Text
        px={2}
        color={'white'}
        fontFamily="Exo 2"
        fontWeight={400}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {text}
      </Text>
    </Flex>
  </Box>
);

const ResultsTitle = ({ children }: { children: ReactNode }) => (
  <Text
    fontWeight={600}
    color="white"
    w="100%"
    px={6}
    pt={1}
    fontFamily="Exo 2"
    fontSize="1rem"
  >
    {children}
  </Text>
);

const SeeAllOption = ({
  type,
  onClick,
}: {
  type: string;
  onClick: () => void;
}) => (
  <Box {...{ onClick }} cursor="pointer">
    <Text
      fontFamily="Exo 2"
      fontWeight={600}
      color="landing450"
      px={3}
      fontSize="0.875rem"
    >
      See All {type}
    </Text>
  </Box>
);

const LIMIT = 3;

interface SearchResults {
  players: PlayerFragment[];
  guilds: GuildFragment[];
}

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const searchInputSubjectRef = useRef(new Subject<string>());
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');
  const [{ players, guilds }, setSearchResults] = useState<SearchResults>({
    players: [],
    guilds: [],
  });

  const resetResults = () => {
    setSearchResults({
      players: [],
      guilds: [],
    });
  };

  const dropdown = useRef<Maybe<HTMLDivElement>>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onClose();
    // Default Show Players Matching With Query
    router.push(`/search/players?q=${query}`);
  };

  useEffect(() => {
    searchInputSubjectRef.current.next(query);
  }, [query]);

  useEffect(() => {
    const searchSubscription = searchInputSubjectRef.current
      .pipe(
        filter((searchValue: string) => {
          if (searchValue.length >= 1) return true;

          resetResults();
          return false;
        }),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((queryString) =>
          forkJoin([
            from(searchPlayers(queryString)),
            from(searchGuilds({ search: queryString, limit: LIMIT })),
          ]),
        ),
        shareReplay(1),
      )
      .subscribe(([{ players: p }, { guilds: g }]) => {
        setSearchResults({ players: p, guilds: g });
      });
    return () => searchSubscription?.unsubscribe();
  }, []);

  const isBodyEmpty = players.length + guilds.length === 0;
  return (
    <Modal {...{ isOpen }} {...{ onClose }} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        top="max(4rem, 8vh)"
        shadow="2xl"
        maxH="700px"
        maxW="500px"
        aria-expanded="true"
        marginTop={1}
        bgColor="transparent"
        p={0}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          minWidth={40}
          pos="relative"
          align="stretch"
          bg="transparent"
          backdropFilter="blur(10px)"
          ref={dropdown}
        >
          <Box as="form" onSubmit={handleSubmit} w="full" color="white">
            <InputGroup
              justifyContent="flex-start"
              h="fit-content"
              p={2}
              my="auto"
              bg={{
                base: '#FFFFFF25',
              }}
              border={{ base: '1px solid #2B2244' }}
              borderTopRadius={4}
              borderBottomRadius={query.length > 0 ? 0 : 4}
              overflow="hidden"
            >
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Image src={SearchIcon} alt="search" height={4} width={4} />
                }
              />
              <Input
                variant="unstyled"
                color="white"
                w="100%"
                placeholder="Find Players or Guilds"
                _placeholder={{ color: 'whiteAlpha.700' }}
                value={query}
                onChange={({ target: { value } }) => setQuery(value)}
                size="sm"
                fontSize="md"
                ref={searchBarRef}
              />
            </InputGroup>
          </Box>
          <ModalBody
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              bg: 'linear-gradient(180deg, rgba(42, 31, 71, 0.9) 6.18%, rgba(17, 3, 32, 0.86) 140%)',
            }}
            borderColor="#2B2244"
            backdropFilter="blur(10px)"
            w="100%"
            maxH="67vh"
            p={0}
          >
            {!isBodyEmpty && (
              <Box w="100%" color="white" py={4}>
                {players.length > 0 && <ResultsTitle>Players</ResultsTitle>}
                {players.length > 0 && (
                  <Box as="ul" role="listbox" mb={2} px={3} color="white">
                    {players?.map((player: PlayerFragment) => (
                      <Option
                        key={player.id}
                        onClick={() => {
                          router.push(getPlayerURL(player) as string);
                          onClose();
                        }}
                        name={getPlayerName(player) ?? 'Unknown'}
                        image={getPlayerImage(player)}
                        text={
                          (getPlayerUsername(player as Maybe<Player>) ||
                            getPlayerName(player)) ??
                          'Unknown'
                        }
                      />
                    ))}
                    {players.length >= LIMIT && (
                      <SeeAllOption
                        type="Players"
                        onClick={() => {
                          router.push(`/search/players?q=${encodeURI(query)}`);
                          onClose();
                        }}
                      />
                    )}
                  </Box>
                )}

                {guilds.length > 0 && <ResultsTitle>Guilds</ResultsTitle>}
                {guilds.length > 0 && (
                  <Box as="ul" role="listbox" mb={2} px={3} color="white">
                    {guilds?.map((guild: GuildFragment) => (
                      <Option
                        key={guild.id}
                        onClick={() => {
                          router.push(`/guild/${guild.guildname}`);
                          onClose();
                        }}
                        name={guild.name}
                        image={guild?.logo as string | undefined}
                        text={guild.name}
                      />
                    ))}
                    {guilds.length >= LIMIT && (
                      <SeeAllOption
                        type="Guilds"
                        onClick={() => {
                          router.push(`/search/guilds?q=${encodeURI(query)}`);
                          onClose();
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            )}
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

type HeaderSearchBarProps = BoxProps & { onOpen: () => void };

const HeaderSearchBar = (props: HeaderSearchBarProps) => {
  const { onOpen, ...restProps } = props;
  return (
    <Tooltip label="Quick Search…   ⌘K">
      <Box
        cursor="pointer"
        display="flex"
        flexDirection="row"
        gap={2}
        h="fit-content"
        maxW="fit-content"
        alignItems="center"
        p={2}
        mx={2}
        my="auto"
        bg={{
          base: '#FFFFFF05',
        }}
        border={{ base: '1px solid #2B2244' }}
        borderRadius={8}
        pos="relative"
        onClick={onOpen}
        {...restProps}
      >
        <Image src={SearchIcon} alt="search" height={4} width={4} />
      </Box>
    </Tooltip>
  );
};

export const MegaMenuHeader: React.FC = () => {
  const { connected, connect, connecting } = useWeb3();
  const router = useRouter();
  const { user, fetching } = useUser();
  const mounted = useMounted();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isSearchOpen) {
          onSearchClose();
        } else {
          onSearchOpen();
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isSearchOpen, onSearchClose, onSearchOpen]);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />
      <Stack
        position={router.pathname === '/players' ? 'relative' : 'sticky'}
        top={0}
        id="MegaMenu"
        zIndex={11}
      >
        <Flex
          borderBottom="1px"
          bg="rgba(0, 0, 0, 0.5)"
          borderColor="#2B2244"
          backdropFilter="blur(10px)"
          px={4}
          py={1.5}
          pb="0"
          h={20}
          justify={{ base: 'space-between', lg: 'center' }}
          w="100%"
        >
          <Flex
            onClick={menuToggle}
            flexWrap="nowrap"
            alignItems="center"
            cursor="pointer"
            h={8}
            w={8}
            display={{ base: 'flex', lg: 'flex', xl: 'none' }}
            p={2}
            my="auto"
          >
            {isOpen ? (
              <CloseIcon fontSize="2xl" color="#FFF" />
            ) : (
              // max-width set in style attribute because the unstyled version
              // is flashing at 100% width on load
              <HamburgerIcon
                fontSize="3xl"
                color="#FFF"
                style={{ maxWidth: '2rem' }}
              />
            )}
          </Flex>
          <Flex
            w={{ base: 'auto', lg: '100%' }}
            align="center"
            justify="space-between"
            pos="relative"
            display={{
              base: 'none',
              sm: 'none',
              md: 'none',
              lg: 'none',
              xl: 'flex',
            }}
          >
            <HStack w="15%" flexShrink={1}>
              <Logo
                link={user ? '/dashboard' : '/'}
                pos={{ base: 'initial', lg: 'relative' }}
                left={0}
                top="auto"
                bottom="auto"
              />
            </HStack>
            <HStack
              flex="0 1 auto"
              align="center"
              justify="center"
              alignSelf="center"
              spacing={0}
            >
              <DesktopNavLinks />

              <HeaderSearchBar onOpen={onSearchOpen} />
            </HStack>
            <Box
              textAlign="right"
              display={{ base: 'none', lg: 'block' }}
              pos="relative"
              right="0"
              left="1"
              top="auto"
              bottom="auto"
              w="15%"
            >
              {connected && !!user && !fetching && !connecting ? (
                <DesktopPlayerStats player={user} />
              ) : (
                <Stack
                  fontWeight="bold"
                  fontFamily="Exo 2, san-serif"
                  align="flex-end"
                >
                  <MetaButton
                    h={10}
                    px={12}
                    onClick={connect}
                    isLoading={!mounted || connecting || fetching}
                  >
                    Connect
                  </MetaButton>
                </Stack>
              )}
            </Box>
          </Flex>
          <Flex align="center" justify="center" pos="relative" display="flex">
            <HeaderSearchBar
              display={{ base: 'none', sm: 'flex', xl: 'none' }}
              right={5}
              onOpen={onSearchOpen}
            />
            <Logo
              display={{ lg: 'flex', xl: 'none' }}
              link={user ? '/dashboard' : '/'}
              pos={{ base: 'initial', lg: 'relative' }}
              pt={1}
              right={4}
            />
          </Flex>
        </Flex>
        <Stack
          display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
          position="fixed"
          top="4.5rem"
          zIndex={1}
          overflowX="hidden"
          w="100vw"
          bg="alphaBlack.200"
          h="calc(100vh - 10rem)"
          backdropFilter="blur(10px)"
          p="1rem"
          border="none"
        >
          <HeaderSearchBar onOpen={onSearchOpen} />
          {MenuSectionLinks.map((section) => (
            <Stack pt={1} key={section.label}>
              <Link
                href={section?.url}
                target={section.type === 'external-link' ? '_blank' : ''}
                display={'flex'}
                flexDir={'row'}
                alignItems={'center'}
              >
                <Text
                  fontSize={18}
                  fontWeight={600}
                  textTransform="capitalize"
                  color={section.type === 'external-link' ? '#79F8FB' : 'white'}
                >
                  {section.label}
                </Text>
                {section.type === 'external-link' && (
                  <ExternalLinkIcon color="#79F8FB" ml="10px" />
                )}
              </Link>
              <SimpleGrid columns={2}>
                {section?.menuItems?.length &&
                  section.menuItems.map(({ title, icon, url }) => (
                    <Link
                      key={title}
                      display="flex"
                      alignItems="center"
                      href={url}
                      border="1px"
                      _odd={{ marginRight: '-1px' }}
                      marginBottom="-1px"
                      borderColor="purple.400"
                      bg="alphaBlack.50"
                      px={2}
                      py={1.5}
                      _hover={{
                        bg: 'alphaWhite.50',
                      }}
                      isExternal={/^https?:\/\//.test(url)}
                    >
                      <Avatar
                        name={title}
                        src={menuIcons[icon]}
                        p={0}
                        w={7}
                        h={7}
                        mr={1}
                        bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
                      />
                      <Text fontSize={20}>{title}</Text>
                    </Link>
                  ))}
              </SimpleGrid>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
