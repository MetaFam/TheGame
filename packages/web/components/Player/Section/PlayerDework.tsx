import {
  Box,
  ExternalLinkIcon,
  Image,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { generateUUID } from '@metafam/utils';
import DeworkLogo from 'assets/integrationLogos/deworkLogo.png';
import { MetaLink } from 'components/Link';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useMemo, useState } from 'react';
import { getDeworkData, processDeworkData } from 'utils/dework';

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
  const [deworkData, setDeworkData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getDeworkData(player?.ethereumAddress).then(
        (res: any) => setDeworkData(res),
        setLoading(false),
      );
    };
    getData();
  }, [player?.ethereumAddress]);

  const processedData = useMemo(
    () => processDeworkData(deworkData),
    [deworkData],
  );

  return (
    <ProfileSection title="Dework Profile" {...{ isOwnProfile, editing }}>
      <Wrap>
        <WrapItem
          position="relative"
          mb={0}
          display={'flex'}
          flexFlow={'row wrap'}
          width="full"
        >
          {deworkData && processedData && !loading ? (
            <>
              <DeworkSectionWrapper>
                <DeworkSectionHeading text="Contributions" />
                <Text fontSize="2xl">{deworkData?.tasks.length}</Text>
              </DeworkSectionWrapper>
              <DeworkSectionWrapper>
                <DeworkSectionHeading text="Earnings" />
                <Text fontSize="2xl">
                  ${(processedData.totalEarnedInUSDC / 10 ** 18).toFixed(2)}
                </Text>
              </DeworkSectionWrapper>
              <DeworkSectionWrapper>
                <DeworkSectionHeading text="Types of tasks" />
                {processedData?.tagGrouping.length > 0 ? (
                  processedData?.tagGrouping.map(
                    (tag: Record<string, number>, i: number) => {
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
                    (org: Record<string, string>, i: number) => {
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
                            {i === 2 && (
                              <Box as="i">{`+${total - 3} other`}</Box>
                            )}
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
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="full"
            >
              <Spinner size="xl" color="purple.500" thickness="4px" />
            </Box>
          )}
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
          {deworkData && (
            <MetaLink
              href={`https://app.dework.xyz/profile/${deworkData.address}`}
              fontWeight={500}
              display="inline-flex"
              alignItems="center"
              isExternal
            >
              See complete profile on Dework <ExternalLinkIcon mx="2px" />
            </MetaLink>
          )}
        </WrapItem>
      </Wrap>
    </ProfileSection>
  );
};
