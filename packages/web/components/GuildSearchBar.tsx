import {
  AddIcon,
  Avatar,
  Box,
  BoxedNextImage as Image,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
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

interface OptionProps {
  text: string;
  name: string;
  url?: string;
  image?: string;
  onClick: () => void;
}

const Option = ({ onClick, name, image, text, url }: OptionProps) => (
  <Box as="li" role="option" sx={{ listStyleType: 'none' }}>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: 4,
        py: 2,
        rounder: 'lg',
        bg: '#341F47',
        mt: '1em',
        pt: 3,
        pb: 3,
        w: '50%',
        ml: '25%',
        border: '2px solid #FFFFFF25',
        borderRadius: '8px',
      }}
    >
      <Flex align="center">
        <Avatar
          name={name}
          src={httpLink(image)}
          w={12}
          h={12}
          borderRadius="8px"
        />
        <Stack gap={0}>
          <Text
            pt={1}
            pl={3}
            color="white"
            fontFamily="Exo 2"
            fontWeight={400}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {text}
          </Text>
          <Text
            pt={1}
            pl={3}
            color="white"
            fontFamily="Exo 2"
            fontWeight={400}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {url}
          </Text>
        </Stack>
      </Flex>
      <IconButton
        {...{ onClick }}
        size="sm"
        variant="outline"
        aria-label="Add guild membership"
        icon={<AddIcon />}
        isRound
        borderColor="white"
        color="white"
        _hover={{ bg: 'transparent', color: 'white', borderColor: 'white' }}
      />
    </Flex>
  </Box>
);

const ResultsTitle = ({ children }: { children: ReactNode }) => (
  <Text
    fontWeight={600}
    color="white"
    w="50%"
    ml="25%"
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

const LIMIT = 3;

interface SearchResults {
  guilds: GuildFragment[];
}

export const GuildSearchBar: React.FC = () => {
  const router = useRouter();
  const searchInputSubjectRef = useRef(new Subject<string>());
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');
  const [{ guilds }, setSearchResults] = useState<SearchResults>({
    guilds: [],
  });

  const resetResults = () => {
    setSearchResults({
      guilds: [],
    });
  };

  const dropdown = useRef<Maybe<HTMLDivElement>>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // onClose();
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
          forkJoin([from(searchGuilds({ search: queryString, limit: 3 }))]),
        ),
        shareReplay(1),
      )
      .subscribe(([{ guilds: g }]) => {
        setSearchResults({ guilds: g });
      });
    return () => searchSubscription?.unsubscribe();
  }, []);
  const isBodyEmpty = guilds.length === 0;
  return (
    <>
      <Box as="form" onSubmit={handleSubmit} color="white" w="50%" ml="25%">
        <InputGroup
          bg="#1B0D2A"
          justifyContent="flex-start"
          h="fit-content"
          p={2}
          my="auto"
          border={{ base: '3px solid #5946BC' }}
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
            placeholder="Find Guilds"
            _placeholder={{ color: 'whiteAlpha.500' }}
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            size="sm"
            fontSize="md"
            ref={searchBarRef}
          />
        </InputGroup>
      </Box>
      <>
        {!isBodyEmpty && (
          <Box
            w="100%"
            borderRadius="0.25rem"
            css={{
              transform: 'translate3d(0px, 15px, 0px)',
            }}
          >
            <Box as="ul" role="listbox" pb={8}>
              {guilds.length > 0 && (
                <ResultsTitle>
                  Only add guilds where you are already a member.
                </ResultsTitle>
              )}
              {guilds?.map((guild: GuildFragment) => (
                <Option
                  key={guild.id}
                  onClick={() => {
                    router.push(`/guild/${guild.guildname}`);
                    // onClose();
                  }}
                  name={guild.name}
                  image={guild?.logo as string | undefined}
                  text={guild.name}
                  url={guild?.websiteUrl as string | undefined}
                />
              ))}
              {guilds.length >= LIMIT && (
                <SeeAllOption
                  type="Guilds"
                  onClick={() => {
                    router.push(`/search/guilds?q=${encodeURI(query)}`);
                    // onClose();
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </>
    </>
  );
};
