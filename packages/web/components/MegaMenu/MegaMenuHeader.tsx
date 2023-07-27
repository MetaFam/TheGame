import {
  Avatar,
  Box,
  BoxedNextImage as Image,
  BoxProps,
  CloseIcon,
  ExternalLinkIcon,
  Flex,
  HamburgerIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  MetaButton,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
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
import { debounceTime, filter, switchMap } from 'rxjs/operators';
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
  <Flex align="center" {...{ onClick }} px={3} py={2} cursor="pointer">
    <Avatar name={name} src={image} w={6} h={6} />
    <Text
      px={2}
      color="black"
      fontFamily="Exo 2"
      fontWeight={400}
      textOverflow="ellipsis"
      overflow="hidden"
      whiteSpace="nowrap"
    >
      {text}
    </Text>
  </Flex>
);

const ResultsTitle = ({ children }: { children: ReactNode }) => (
  <Text
    fontWeight={600}
    color="black"
    w="100%"
    px={3}
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

const atLimit = (x: number, limit = 3) => x === limit;

interface SearchResults {
  players: PlayerFragment[];
  guilds: GuildFragment[];
}

const Search = () => {
  const router = useRouter();
  const searchInputSubjectRef = useRef(new Subject<string>());
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [{ players, guilds }, setSearchResults] = useState<SearchResults>({
    players: [],
    guilds: [],
  });
  const dropdown = useRef<Maybe<HTMLDivElement>>(null);
  const handleSubmit: FormEventHandler<HTMLDivElement> &
    FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Default Show Players Matching With Query
    router.push(`/search/players?q=${query}`);
  };

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return () => {};

    const handleClick = ({ target }: MouseEvent) => {
      if (!dropdown.current?.contains(target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [showDropdown]);

  useEffect(() => {
    searchInputSubjectRef.current.next(query);
  }, [query]);

  useEffect(() => {
    const searchSubscription = searchInputSubjectRef.current
      .pipe(
        filter((searchValue: string) => searchValue.length >= 1),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((queryString) =>
          forkJoin([
            from(searchPlayers(queryString)),
            from(searchGuilds(queryString)),
          ]),
        ),
      )
      .subscribe(([p, g]) => {
        setSearchResults({ players: p.players, guilds: g.guilds });
      });
    return () => searchSubscription?.unsubscribe();
  }, []);

  const searchBarRect = searchBarRef?.current?.getBoundingClientRect();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      minWidth={40}
      position="relative"
      ref={dropdown}
    >
      <Box as="form" onSubmit={handleSubmit} w="full" color="black">
        <InputGroup
          justifyContent="flex-start"
          minW={{ base: '20%', lg: '10%' }}
          h="fit-content"
          p={2}
          my="auto"
          bg={{
            xl: '#FFFFFF05',
          }}
          border={{ base: 'none', xl: '1px solid #2B2244' }}
          borderRadius={4}
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
            placeholder="Find anything"
            _placeholder={{ color: 'whiteAlpha.500' }}
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            onFocus={() => setShowDropdown(true)}
            size="sm"
            fontSize="md"
            ref={searchBarRef}
          />
        </InputGroup>
      </Box>
      {showDropdown && searchBarRect && players.length + guilds.length > 0 && (
        <Portal>
          <Box
            zIndex={15}
            position="absolute"
            top={searchBarRect.top + 5}
            right={searchBarRect.right}
            left={searchBarRect.left}
            bg="white"
            maxW={searchBarRect.width}
            w="100%"
            mt={2}
            css={{
              backdropFilter: 'blur(8px)',
              transform: 'translate3d(0px, 42.5px, 0px)',
            }}
            borderRadius="0.5rem"
            p={2}
          >
            {players.length > 0 && <ResultsTitle>Players</ResultsTitle>}
            {players?.map((player: PlayerFragment) => (
              <Option
                key={player.id}
                onClick={() => {
                  router.push(getPlayerURL(player) as string);
                  setShowDropdown(false);
                }}
                name={getPlayerName(player) ?? 'Unknown'}
                image={getPlayerImage(player)}
                text={getPlayerUsername(player as Maybe<Player>) ?? 'Unknown'}
              />
            ))}
            {atLimit(players.length) && (
              <SeeAllOption
                type="Players"
                onClick={() => {
                  router.push(`/search/players?q=${encodeURI(query)}`);
                  setShowDropdown(false);
                }}
              />
            )}
            {guilds.length > 0 && <ResultsTitle>Guilds</ResultsTitle>}
            {guilds?.map((guild: GuildFragment) => (
              <Option
                key={guild.id}
                onClick={() => {
                  router.push(`/guild/${guild.guildname}`);
                  setShowDropdown(false);
                }}
                name={guild.guildname}
                image={guild?.logo as string | undefined}
                text={guild.guildname}
              />
            ))}
            {atLimit(guilds.length) && (
              <SeeAllOption
                type="Guilds"
                onClick={() => {
                  router.push(`/search/quilds?q=${encodeURI(query)}`);
                  setShowDropdown(false);
                }}
              />
            )}
          </Box>
        </Portal>
      )}
    </Flex>
  );
};

export const MegaMenuHeader: React.FC = () => {
  const { connected, connect, connecting } = useWeb3();
  const router = useRouter();
  const { user, fetching } = useUser();
  const mounted = useMounted();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

  return (
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
        h={20}
        justify="space-between"
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
          justify="center"
          pos="relative"
          display={{
            base: 'none',
            sm: 'none',
            md: 'none',
            lg: 'none',
            xl: 'flex',
          }}
        >
          <Logo
            link={user ? '/dashboard' : '/'}
            pos={{ base: 'initial', lg: 'relative' }}
            left={0}
            top="auto"
            bottom="auto"
          />
          <DesktopNavLinks />
          <Search />
          <Box
            textAlign="right"
            display={{ base: 'none', lg: 'block' }}
            pos="relative"
            right="0"
            left="1"
            top="auto"
            bottom="auto"
          >
            {connected && !!user && !fetching && !connecting ? (
              <DesktopPlayerStats player={user} />
            ) : (
              <Stack
                fontWeight="bold"
                fontFamily="Exo 2, san-serif"
                align="center"
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
        <Logo
          display={{ lg: 'flex', xl: 'none' }}
          link={user ? '/dashboard' : '/'}
          pos={{ base: 'initial', lg: 'absolute' }}
          pt={1}
          right={4}
        />
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
  );
};
