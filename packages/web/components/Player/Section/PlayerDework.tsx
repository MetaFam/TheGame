import {
  Box,
  Button,
  ExternalLinkIcon,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  InfoIcon,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { generateUUID } from '@metafam/utils';
import { to } from '@react-spring/web';
import DeworkLogo from 'assets/integrationLogos/deworkLogo.png';
import { MetaLink } from 'components/Link';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import {
  getDeworkData,
  type Organisation,
  processDeworkData,
} from 'utils/dework';
import { formatAddress } from 'utils/playerHelpers';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

type DeworkSectionWrapperProps = {
  children: React.ReactNode;
};

type DeworkSectionHeadingProps = {
  text: string;
};

export const DeworkSectionWrapper: React.FC<DeworkSectionWrapperProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <VStack
    display="inline-flex"
    flex="0 0 50%"
    maxWidth="50%"
    textAlign="left"
    alignItems="left"
    mb={3}
    gap={0}
  >
    {children}
  </VStack>
);

export const DeworkSectionHeading: React.FC<DeworkSectionHeadingProps> = ({
  text,
}: {
  text: string;
}) => (
  <Text fontSize="md" color="blueLight" mb={0} whiteSpace="nowrap">
    {`${text}`}
  </Text>
);

export const PlayerDework: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const [role, setRole] = useState<string>('AddURL');
  const [playerDeworkURL, setPlayerDeworkURL] = useState<string>('');
  const [addressMatch, setAddressMatch] = useState<boolean>(false);
  const [deworkData, setDeworkData] = useState<any>();
  const connected = addressMatch && !playerDeworkURL;
  const [loading, setLoading] = useState<boolean>(true);
  const noticeRef = useRef<HTMLDivElement>(null);
  const getData = useCallback(async (address: string) => {
    setLoading(true);
    await getDeworkData(address).then((res: any) => {
      setDeworkData(res);
      const lowerCaseAddress = address.toLowerCase();
      const lowerCaseResAddress = res.address.toLowerCase();
      const hasTasks = res.tasks.length > 0;
      // test if address matches dework data
      if (lowerCaseResAddress === lowerCaseAddress && hasTasks) {
        setAddressMatch(true);
      } else {
        setAddressMatch(false);
      }
      setLoading(false);

    });
  }, []);

  useEffect(() => {
    getData(player?.ethereumAddress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.ethereumAddress]);

  const retryCall = async () => {
    await getData(player?.ethereumAddress);
  };

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        // find the parent div of the noticeRef and position noticeRef at the top
        const parentDiv = noticeRef.current?.parentElement;
        if (parentDiv) {
          parentDiv.style.position = 'relative';
          parentDiv.style.top = '0';
        }

      }
    },[]);

  useMemo(
    () => {
      if (loading) {
        setRole('Loading');
      } else if (playerDeworkURL) {
          setRole('DeworkProfile');
        } else if (addressMatch && !playerDeworkURL) {
          setRole('AddURL')
        } else {
          setRole('NoMatch');
        }
    },
    [loading, playerDeworkURL, addressMatch],
  );

  return (
    <ProfileSection title="Dework Profile" {...{ isOwnProfile, editing, connected }}>
      <Box position={'relative'} m={0}>
      <PlayerDeworkView
        role={role}
        player={player}
        setPlayerDeworkURL={setPlayerDeworkURL}
        profileData={deworkData}
        retry={() => retryCall()}
        />
        {role !== 'NoMatch' && (
          <Image
            src={DeworkLogo.src}
            height="35px"
            width="35px"
            mx="auto"
            position="absolute"
            bottom={0}
            right={0}
            alt="Dework logo"
          />
        )}
        </Box>
    </ProfileSection>
  );
};

const DeworkProfile: React.FC<{data: any }> = ({ data }) => {

  const processedData = useMemo(
    () => processDeworkData(data),
    [data],
  );

  return (
    <Wrap>
      <WrapItem
        position="relative"
        mb={0}
        display={'flex'}
        flexFlow={'row wrap'}
        width="full"
      >
        {data && processedData && (
          <>
            <DeworkSectionWrapper>
              <DeworkSectionHeading text="Contributions" />
              <Text fontSize="2xl">{data?.tasks.length}</Text>
            </DeworkSectionWrapper>
            <DeworkSectionWrapper>
              <DeworkSectionHeading text="Earnings" />
              <Text fontSize="2xl">
                $
                {(processedData.totalEarnedInUSDC / (10 * 10 ** 18)).toFixed(2)}
              </Text>
            </DeworkSectionWrapper>
            <DeworkSectionWrapper>
              <DeworkSectionHeading text="Types of tasks" />
              {processedData?.tagGrouping.length > 0 ? (
                processedData?.tagGrouping.map(
                  (tag: { name: string; count: number }, i: number) => {
                    const total: number = processedData?.tagGrouping.length;
                    if (i < 3) {
                      return (
                        <>
                          <Text
                            key={generateUUID()}
                            textTransform="capitalize"
                            fontSize={{ base: 'sm', xl: 'md' }}
                          >
                            <Box as="span" textOverflow="ellipsis">
                              {tag.name}
                            </Box>{' '}
                            ({tag.count})
                          </Text>
                          {i === 2 && (
                            <Box as="i" fontSize="sm">{`+${
                              total - 3
                            } other`}</Box>
                          )}
                        </>
                      );
                    }
                    return undefined;
                  },
                )
              ) : (
                <Text>No tasks</Text>
              )}
            </DeworkSectionWrapper>
            <DeworkSectionWrapper>
              <DeworkSectionHeading text="Organizations" />
              {processedData?.uniqueOrganisations.length > 0 ? (
                processedData?.uniqueOrganisations.map(
                  (org: Organisation, i: number) => {
                    const total: number =
                      processedData?.uniqueOrganisations.length;
                    if (i < 3) {
                      return (
                        <>
                          <Text
                            key={generateUUID()}
                            fontSize={{ base: 'sm', xl: 'md' }}
                          >
                            {org.name}
                          </Text>
                          {i === 2 && <Box as="i">{`+${total - 3} other`}</Box>}
                        </>
                      );
                    }
                    return undefined;
                  },
                )
              ) : (
                <Text>No organizations</Text>
              )}
            </DeworkSectionWrapper>
          </>
        )}
        {data && (
          <MetaLink
            href={`https://app.dework.xyz/profile/${data.username}`}
            fontWeight={500}
            display="inline-flex"
            alignItems="center"
            isExternal
          >
            See <Text as="span" display={{ base: 'none', xl: 'inline' }}>&nbsp;complete&nbsp;</Text> profile on Dework <ExternalLinkIcon mx="2px" />
          </MetaLink>
        )}
      </WrapItem>
    </Wrap>
  );
};

const PlayerDeworkView: React.FC<{
  role: string;
  player: Player;
  setPlayerDeworkURL: any;
  profileData: any;
  retry: () => void;
}> = ({ role, player, setPlayerDeworkURL, retry, profileData }) => {

  const currentView = {
    AddURL: <DeworkLink setPlayerDeworkURL={setPlayerDeworkURL} />,
    Loading: <Loading />,
    NoMatch: <NoMatch playerAddress={player.ethereumAddress} retry={retry} />,
    DeworkProfile: <DeworkProfile data={profileData} />,
  }[role];

  return <>{currentView}</>;
};

const DeworkLink: React.FC<{ setPlayerDeworkURL: any }> = ({
  setPlayerDeworkURL,
}) => {
  const [deworkURL, setDeworkURL] = useState<string>('');

  return (
    <>
      <FormControl id="deworkURL" mb={4}>
        <FormLabel>Input Dework Username
          <Tooltip
            label="It is not currently possible to obtain the username from the Dework API. Please enter your Dework username exactly as it appears on Dework."
            aria-label="It is not currently possible to obtain the username from the Dework API. Please enter your Dework username exactly as it appears on Dework."
            placement="top"
            bgColor={'purple.400'}
            hasArrow
          >
            <InfoIcon ml={2} />
          </Tooltip>

        </FormLabel>
        <Input
          value={deworkURL}
          pl={2}
          type="text"
          inputMode="text"
          placeholder="Example: Sero | Hunters Workshop"
          step="any"
          onChange={({ target: { value } }) => setDeworkURL(value)}
        />
        <FormHelperText color="white">Enter exactly as written on Dework</FormHelperText>
      </FormControl>
      <Button
        onClick={() => setPlayerDeworkURL(deworkURL)}
        isDisabled={!deworkURL}
        _disabled={{
          cursor: 'not-allowed',
        }}
      >
        {deworkURL ? 'Proceed To Block' : 'Please Enter Dework username'}
      </Button>
    </>
  );
};

const NoMatch: React.FC<{ playerAddress: string, retry: () => void }> = ({ playerAddress, retry }) => (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="left"
      p={6}
      pb={14}
      gap={4}
      height="100%"
      width="full"
      _after={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bottom: 10,
        height: 'calc(100% - 2rem)',
        zIndex: -1,
        bgColor: 'red.500',
        opacity: 0.25,
      }}
    >
      <Heading as="h4" fontFamily="body" fontSize="md" textAlign="left" w="full"><InfoIcon mr={2} /> Wallets do not match </Heading>
      <Text>We couldn’t find a Dework profile with the ETH address you used to connect with MetaGame.</Text>
      <Text>Go to your <MetaLink href={"https://app.dework.xyz/"} color="white" textDecoration="underline" isExternal>Dework</MetaLink> profile and make sure you have connected with wallet <strong>{formatAddress(playerAddress)}</strong>.</Text>
      <Text>Connecting to a different wallet on Dework won’t result in any data loss or other issues.</Text>
      <Button
        mt={4}
        colorScheme="whiteAlpha"
        color="white"
        borderColor="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        variant="outline"
        borderRadius={0}
        w="full"
        onClick={() => retry()}
        leftIcon={<MdRefresh />}
      >
        Try Again
    </Button>

    <MetaLink href={"https://app.dework.xyz/"} color="white" textDecoration="underline" display="block" position="absolute" bottom={0} transform="auto" translateY={2} isExternal>Go to Dework <ExternalLinkIcon ml={1} /></MetaLink>
    </Box>
  );

const Loading: React.FC = () => (
  <Box
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    height="100%"
    width="full"
  >
    <Spinner size="lg" color="white" thickness="3px" />
    <Text ml={4} pr={16} flexGrow={1}>Looking for a Dework profile with the same ETH address</Text>
  </Box>
);
