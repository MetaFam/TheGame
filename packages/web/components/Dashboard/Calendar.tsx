import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  CalendarAddIcon,
  CalendarIcon,
  ExternalLinkIcon,
  Flex,
  HStack,
  Image,
  List,
  ListItem,
  LoadingState,
  MetaButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import type { GroupedEventsType } from 'lib/hooks/useCalendar';
import { useCalendar } from 'lib/hooks/useCalendar';
import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react';
import { safelyParseContent } from 'utils/stringHelpers';

const loadMoreButtonStyles: ButtonProps = {
  display: 'flex',
  variant: 'ghost',
  bg: 'blackAlpha.300',
  color: 'violet',
  fontSize: 'sm',
  w: 'auto',
  h: 'full',
  py: 0,
  px: 4,
  textTransform: 'none',
};

export const Calendar: React.FC = () => {
  const [calendar, setCalendar] = useState<GroupedEventsType[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const showHowMany = 3;
  const {
    fetching,
    error,
    ics,
    eventsGroupedByDay,
    totalEvents,
    buildAddToCalendarLink,
    limit,
    setLimit,
  } = useCalendar(showHowMany);
  const lastItemRef = useRef<HTMLLIElement>(null);
  const handleShowMoreItems = async () => {
    try {
      if (loadingMore || limit >= totalEvents) return;
      setLoadingMore(true);
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 0);
      setTimeout(() => {
        setLimit(limit + showHowMany);
        setLoadingMore(false);
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  function renderLoadMoreButton() {
    if (limit < totalEvents) {
      return (
        <MetaButton onClick={handleShowMoreItems} {...loadMoreButtonStyles}>
          {loadingMore ? <Spinner size="xs" /> : 'Load More'}
        </MetaButton>
      );
    }

    return (
      <Tooltip label="No more to load" aria-label="A tooltip">
        <MetaButton as="span" isDisabled {...loadMoreButtonStyles}>
          Load more
        </MetaButton>
      </Tooltip>
    );
  }

  useEffect(() => {
    if (!fetching && eventsGroupedByDay) {
      const limitedEvents = eventsGroupedByDay.slice(0, limit);
      setCalendar(limitedEvents);
    }
  }, [limit, fetching, eventsGroupedByDay]);

  if (error) {
    return (
      <Flex direction="column" p={6} width="100%" minH="100%">
        <Flex align="center" justify="center" width="100%">
          {error.message}
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex direction="column" p={6} width="100%" minH="100%">
      {fetching ? (
        <Flex align="center" justify="center" width="100%">
          <LoadingState />
        </Flex>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyItems="stretch"
          height="100%"
        >
          <HStack
            align={'center'}
            justifyContent={'flex-start'}
            gap={5}
            flexShrink={1}
            position="relative"
            pb={3}
          >
            <HStack flexGrow={1}>
              <Text
                as="span"
                fontSize="lg"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Calendar
              </Text>
            </HStack>
            <Box flexShrink={1}>
              <Button
                as={MetaLink}
                href={ics}
                isExternal
                aria-label="Add calendar"
                leftIcon={<CalendarIcon />}
                justifySelf="flex-end"
                variant="ghost"
                bg="blackAlpha.300"
                color="violet"
                fontSize="sm"
                translateX={9}
              >
                Download ICS
              </Button>
            </Box>
          </HStack>
          <Box flexGrow={1} overflowY="auto" mb={9} h="100%">
            <HStack
              position="absolute"
              inset={0}
              top="auto"
              bottom={4}
              justify="center"
              align="stretch"
              py={0}
              height="40px"
            >
              {renderLoadMoreButton()}
            </HStack>
            <VStack
              as="ol"
              className="calendar"
              width="100%"
              mt={5}
              ml={0}
              px={0}
              pr={limit > 4 ? 3 : 0}
              transition={'all 0.3s ease'}
              sx={{
                listStyle: 'none',
              }}
            >
              {calendar.length > 0 &&
                calendar.map((day, i) => {
                  const last = i === calendar.length - 1;
                  return (
                    <Box
                      ref={last ? lastItemRef : null}
                      as="li"
                      className="calendar__day"
                      display="flex"
                      width="100%"
                      px={0}
                      py={0}
                      mb={3}
                      flexFlow="column wrap"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      key={day.date}
                      _last={{
                        mb: 0,
                      }}
                    >
                      <Box
                        as="h3"
                        fontSize="sm"
                        fontFamily="body"
                        fontWeight={400}
                        className="calendar__day--title"
                        mb={2}
                        pl={0}
                      >
                        {DateTime.fromISO(day.date)
                          .toLocaleString({ weekday: 'long' })
                          .toUpperCase()}{' '}
                        •{' '}
                        {DateTime.fromISO(day.date)
                          .toLocaleString({
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                          .toUpperCase()}
                      </Box>
                      <List
                        as={VStack}
                        className="calendar__day--events"
                        ml={0}
                        width="100%"
                        sx={{
                          listStyle: 'none',
                        }}
                      >
                        {day &&
                          day.events?.map((event) => {
                            const { cover, description } = event;

                            return (
                              <ListItem
                                key={event.id}
                                position="relative"
                                className="calendar__day--event"
                                width="100%"
                                px={5}
                                py={2}
                                backgroundColor="blackAlpha.500"
                                borderRadius="md"
                                overflow="hidden"
                                role="group"
                                _groupHover={{
                                  backgroundColor: 'blackAlpha.600',
                                }}
                              >
                                <Popover colorScheme="purple">
                                  <Event
                                    title={event.summary}
                                    start={DateTime.fromISO(
                                      'dateTime' in event.start
                                        ? event.start.dateTime
                                        : event.start.date,
                                    ).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                    end={DateTime.fromISO(
                                      'dateTime' in event.end
                                        ? event.end.dateTime
                                        : event.end.date,
                                    ).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                  />

                                  <EventPopover
                                    title={event.summary}
                                    start={DateTime.fromISO(
                                      'dateTime' in event.start
                                        ? event.start.dateTime
                                        : event.start.date,
                                    ).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                    end={DateTime.fromISO(
                                      'dateTime' in event.end
                                        ? event.end.dateTime
                                        : event.end.date,
                                    ).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                    description={description}
                                    cover={cover}
                                    htmlLink={event.htmlLink}
                                    location={event.location}
                                    addToCalUrl={buildAddToCalendarLink(event)}
                                  />
                                </Popover>
                                <Box
                                  position="absolute"
                                  inset={0}
                                  _groupHover={{
                                    backgroundColor: 'blackAlpha.600',
                                  }}
                                  transition="all 0.1s ease-in-out"
                                  zIndex={-1}
                                />
                              </ListItem>
                            );
                          })}
                      </List>
                    </Box>
                  );
                })}
            </VStack>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

interface EventType {
  title: string;
  start: string;
  end: string;
}

const Event = ({ title, start, end }: EventType) => (
  <PopoverTrigger>
    <Box tabIndex={0} role="button" aria-label="Event summary" zIndex={10}>
      <Text as="h4" fontSize="md" fontFamily="body" fontWeight="bold" mb={0}>
        {title}
      </Text>
      <HStack spacing={1} align="center" justify="space-between">
        <Text as="span" fontWeight="400" fontFamily="body" fontSize="sm">
          {start} – {end}
        </Text>
      </HStack>
    </Box>
  </PopoverTrigger>
);

interface EventPopoverType {
  title: string;
  start: string;
  end: string;
  description: string;
  cover?: string;
  htmlLink: string;
  location: string;
  addToCalUrl: string;
}

const EventPopover = ({
  title,
  start,
  end,
  description,
  cover,
  htmlLink,
  location,
  addToCalUrl,
}: EventPopoverType) => (
  <Portal>
    <PopoverContent
      bgColor="darkPurpleAlpha.200"
      backdropFilter="blur(10px)"
      boxShadow="0 0 10px rgba(0,0,0,0.3)"
      borderWidth={0}
      color="white"
      sx={{
        _focus: {
          outline: 'none',
        },
      }}
    >
      <Box role="group" position="relative" w="full" h="full">
        <PopoverCloseButton
          zIndex={3}
          top={'calc(var(--chakra-space-2) + 1px)'}
        />
        <PopoverHeader
          position={'relative'}
          borderColor="whiteAlpha.300"
          borderBottomWidth={1}
          fontWeight="600"
          fontFamily="exo"
          zIndex={2}
        >
          {title}
        </PopoverHeader>
        <PopoverBody position="relative" zIndex={2}>
          <Box
            as="dl"
            maxH={'200px'}
            overflowY="auto"
            pr={2}
            sx={{
              dt: {
                fontSize: 'sm',
                fontWeight: '600',
              },
            }}
          >
            <Box as="dt">Time</Box>
            <Box as="dd" fontWeight="400" fontFamily="body" fontSize="xs">
              {`${start} – ${end}`}
            </Box>
            {description && (
              <Box>
                <Box as="dt">Description</Box>
                <Box as="dd" fontWeight="400" fontFamily="body" fontSize="xs">
                  {safelyParseContent(description)}
                </Box>
              </Box>
            )}
            {location && (
              <Box>
                <Box as="dt">Location</Box>
                <Box as="dd" fontWeight="400" fontFamily="body" fontSize="xs">
                  {location}
                </Box>
              </Box>
            )}
          </Box>
        </PopoverBody>
        <PopoverFooter position="relative" borderTopWidth={0} zIndex={2}>
          <ButtonGroup
            variant="ghost"
            colorScheme="cyan"
            justifyContent="space-between"
            w="full"
          >
            <Button
              as={MetaLink}
              aria-label="Add to your calendar"
              fontSize="sm"
              href={addToCalUrl}
              leftIcon={<CalendarAddIcon />}
              isExternal
            >
              Add event
            </Button>
            <Button
              aria-label="View calendar"
              as={MetaLink}
              fontSize="sm"
              href={htmlLink}
              isExternal
              leftIcon={<ExternalLinkIcon />}
            >
              View full event
            </Button>
          </ButtonGroup>
        </PopoverFooter>
        <Box
          position="absolute"
          borderRadius="md"
          overflow={'hidden'}
          inset={0}
          zIndex={0}
          sx={{
            '&::after': {
              position: 'absolute',
              content: '""',
              boxShadow:
                '0 0 80px 10px var(--chakra-colors-darkPurpleAlpha-900) inset',
              w: 'full',
              h: 'full',
              inset: 0,
              opacity: cover ? 0.8 : 0.7,
              zIndex: 1,
            },
          }}
        >
          {cover && (
            <Image
              src={cover}
              alt={title}
              objectFit="cover"
              h="full"
              w="auto"
              opacity={0.2}
              zIndex={0}
            />
          )}
        </Box>
      </Box>
    </PopoverContent>
  </Portal>
);
