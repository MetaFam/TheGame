import {
  AddIcon,
  Avatar,
  Box,
  BoxedNextImage as Image,
  Flex,
  Icon,
  IconButton,
  InfoIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
} from '@metafam/ds';
import { httpLink } from '@metafam/utils';
import SearchIcon from 'assets/search-icon.svg';
import {
  GuildFragment,
  Player,
  useAddGuildMemberMutation,
} from 'graphql/autogen/types';
import { searchGuilds } from 'graphql/queries/guild';
import { useRouter } from 'next/router';
import React, {
  FormEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { distinctUntilChanged, forkJoin, from, Subject } from 'rxjs';
import { debounceTime, filter, shareReplay, switchMap } from 'rxjs/operators';

interface OptionProps {
  id: string;
  name: string;
  playerId: string;
  websiteURL?: string;
  legitimacy?: string;
  logo?: string;
}

const Option = ({ id, name, logo, websiteURL, legitimacy, playerId }: OptionProps) => {
  const [addingGuild, setAddingGuild] = useState<boolean>(false);
  const [addedGuild, setAddedGuild] = useState<boolean>(false);

  const [, addGuildMember] = useAddGuildMemberMutation();

  const handleAddGuildMembership = async (guildId: string) => {
    if (legitimacy === 'VERIFIED') return;
    try {
      setAddingGuild(true)
      const response = await addGuildMember({
        playerId,
        guildId,
      });
      if (response && response.data) {
        setAddingGuild(false)
        setAddedGuild(true)
        setTimeout(() => {
          setAddedGuild(false)
        }, 3000);
      }
      // Handle the response if necessary.
      // For example, you might want to update the UI based on the mutation's result:
      // if (response && response.data) {

      // }
    } catch (error) {
      throw Error(
        `Error upserting the Dework profile: ${(error as Error).message}`,
      );
    }
  };
  return (
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
        <Flex align="center" w="full">
          <Avatar
            name={name}
            src={httpLink(logo)}
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
              {name}
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
              {websiteURL}
            </Text>
          </Stack>
        </Flex>
        <Tooltip label={legitimacy ? 'If you are already a member of this verified guild please reach out to us on Discord for help.' : ''}>
          {addedGuild ?
            <Icon boxSize={10} as={IoIosCheckmarkCircleOutline} />
            :
            <IconButton
              onClick={async () => {
                await handleAddGuildMembership(id);
              }}
              isLoading={addingGuild}
              size="sm"
              variant="outline"
              aria-label="Add guild membership"
              icon={legitimacy === 'VERIFIED' ? <InfoIcon /> : <AddIcon />}
              isRound
              borderColor="white"
              color="white"
              _hover={{ bg: 'transparent', color: 'white', borderColor: 'white' }}
              borderWidth={2}
            />
          }
        </Tooltip>
      </Flex>
    </Box>
  )
}


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

export const GuildSearchBar: React.FC<{ player: Player }> = ({ player }) => {
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
                  {...guild}
                  logo={guild.logo || ''}
                  websiteURL={guild.websiteURL || ''}
                  legitimacy={guild.legitimacy || ''}
                  playerId={player.id}
                />
              ))}
              {guilds.length >= LIMIT && (
                <SeeAllOption
                  type="Guilds"
                  onClick={() => {
                    router.push(`/search/guilds?q=${encodeURI(query)}`);
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
