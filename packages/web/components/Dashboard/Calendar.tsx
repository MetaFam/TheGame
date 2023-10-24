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
  IconButton,
  Image,
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
import { MarkdownViewer } from 'components/MarkdownViewer';
import { CONFIG } from 'config';
import type { GoogleCalEventType } from 'lib/hooks/useCalendar';
import { useCalendar } from 'lib/hooks/useCalendar';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

type GroupedEventsType = {
  date: string;
  events: GoogleCalEventType[];
};

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
  const { calendarId } = CONFIG;
  const [loadingMore, setLoadingMore] = useState(false);
  const showHowMany = 4;
  const [limit, setLimit] = useState(showHowMany);
  const { events, fetching, error } = useCalendar();
  const calICS = `https://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`;
  const totalEvents = events?.length || 0;
  const clampedEvents = events?.slice(0, limit);

  // strip out the +++cover+++ from the description
  const cleanDescription = (desc: string) =>
    desc ? desc.replace(/(\+\+\+).*(\+\+\+)/, '') : '';

  const buildAddToCalendarLink = (event: GoogleCalEventType) => {
    const start =
      'dateTime' in event.start
        ? DateTime.fromISO(event.start.dateTime)
        : DateTime.fromISO(event.start.date);
    const end =
      'dateTime' in event.end
        ? DateTime.fromISO(event.end.dateTime)
        : DateTime.fromISO(event.end.date);
    const title = event.summary;
    const { location } = event;
    const details = `${cleanDescription(event.description)}`;
    const dates = `${start.toFormat('yyyyMMdd')}T${start.toFormat(
      'HHmmss',
    )}/${end.toFormat('yyyyMMdd')}T${end.toFormat('HHmmss')}`;
    const href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    return href;
  };

  const groupEventsByDay = (items: GoogleCalEventType[]) => {
    const groupedEvents = items.reduce((acc, event) => {
      const start =
        'dateTime' in event.start
          ? DateTime.fromISO(event.start.dateTime)
          : DateTime.fromISO(event.start.date);
      const date = `${start}`;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as Record<string, GoogleCalEventType[]>);

    const days = Object.entries(groupedEvents).map(([date, calEvents]) => ({
      date,
      events: calEvents as GoogleCalEventType[],
    }));

    return days;
  };

  const handleShowMoreItems = async () => {
    try {
      setLoadingMore(true);
      setTimeout(() => {
        setLimit((prevValue) => prevValue + showHowMany);
        setLoadingMore(false);
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  function renderLoadMoreButton() {
    if (limit < totalEvents) {
      /* When there are more items to show */
      return (
        <MetaButton onClick={handleShowMoreItems} {...loadMoreButtonStyles}>
          {loadingMore ? <Spinner size="xs" /> : 'Load More'}
        </MetaButton>
      );
    }

    /* When there are no more items to show */
    return (
      <Tooltip label="No more to load" aria-label="A tooltip">
        <MetaButton as="span" isDisabled {...loadMoreButtonStyles}>
          Load more
        </MetaButton>
      </Tooltip>
    );
  }

  useEffect(() => {
    if (!fetching && clampedEvents !== undefined) {
      const days = groupEventsByDay(clampedEvents as GoogleCalEventType[]);
      setCalendar(days);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, fetching]);

  if (error) {
    return (
      <VStack align="center" justify="center" width="100%">
        {error.message}
      </VStack>
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
              {/* <Text as="span" color="Highlight" fontWeight={600}>
                  {timeZone.users} {`(UTC${usersOffsetString}) ${DateTime.local().zoneName}`}
                </Text> */}
            </HStack>
            <Box flexShrink={1}>
              <Button
                as={MetaLink}
                href={calICS}
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
                calendar.map((day) => (
                  <Box
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
                    role="group"
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
                    <VStack
                      as="ol"
                      className="calendar__day--events"
                      ml={0}
                      width="100%"
                      sx={{
                        listStyle: 'none',
                      }}
                    >
                      {day &&
                        day.events?.map((event) => (
                          <Box
                            as="li"
                            className="calendar__day--event"
                            width="100%"
                            px={5}
                            py={2}
                            backgroundColor="blackAlpha.500"
                            borderRadius="md"
                            role="group"
                            _groupHover={{
                              backgroundColor: 'blackAlpha.600',
                            }}
                          >
                            <Popover colorScheme="purple">
                              <Event
                                title={event.summary}
                                start={
                                  'dateTime' in event.start
                                    ? DateTime.fromISO(
                                        event.start.dateTime,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                    : DateTime.fromISO(
                                        event.start.date,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                }
                                end={
                                  'dateTime' in event.end
                                    ? DateTime.fromISO(
                                        event.end.dateTime,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                    : DateTime.fromISO(
                                        event.end.date,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                }
                              />
                              <EventPopover
                                title={event.summary}
                                start={
                                  'dateTime' in event.start
                                    ? DateTime.fromISO(
                                        event.start.dateTime,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                    : DateTime.fromISO(
                                        event.start.date,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                }
                                end={
                                  'dateTime' in event.end
                                    ? DateTime.fromISO(
                                        event.end.dateTime,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                    : DateTime.fromISO(
                                        event.end.date,
                                      ).toLocaleString(DateTime.TIME_24_SIMPLE)
                                }
                                description={cleanDescription(
                                  event.description,
                                )}
                                htmlLink={event.htmlLink}
                                location={event.location}
                                addToCalUrl={buildAddToCalendarLink(event)}
                              />
                            </Popover>
                          </Box>
                        ))}
                    </VStack>
                  </Box>
                ))}
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
    <Box tabIndex={0} role="button" aria-label="Event summary">
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
  htmlLink: string;
  location: string;
  addToCalUrl: string;
}

const EventPopover = ({
  title,
  start,
  end,
  description,
  htmlLink,
  location,
  addToCalUrl,
}: EventPopoverType) => (
  <Portal>
    <PopoverContent
      backgroundColor="purpleTag70"
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
      <Box
        bg="transparent"
        borderWidth={0}
        position="absolute"
        left={-1}
        top={0}
        width="100%"
        textAlign="center"
      >
        <Image
          src="/assets/logo.png"
          minH="15px"
          minW="12px"
          maxH="15px"
          mx="auto"
          transform="translateY(-7px)"
        />
      </Box>
      <PopoverCloseButton />
      <PopoverHeader
        borderColor="cyanText"
        borderBottomWidth={1}
        fontWeight="600"
        fontFamily="exo"
      >
        {title}
      </PopoverHeader>
      <PopoverBody>
        <Box
          as="dl"
          sx={{
            dt: {
              fontSize: 'sm',
              fontWeight: '600',
            },
          }}
        >
          <Box as="dt">Date &amp; Time</Box>
          <Box as="dd" fontWeight="400" fontFamily="body" fontSize="xs">
            {`${start} – ${end}`}
          </Box>
          {description && (
            <Box>
              <Box as="dt">Description</Box>
              <Box as="dd" fontWeight="400" fontFamily="body" fontSize="xs">
                <MarkdownViewer>{description}</MarkdownViewer>
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
      <PopoverFooter borderTopWidth={0}>
        <ButtonGroup variant="ghost" colorScheme="cyan">
          <IconButton
            as={MetaLink}
            aria-label="Add to your calendar"
            fontSize="lg"
            href={addToCalUrl}
            icon={<CalendarAddIcon />}
            isExternal
          />
          <IconButton
            aria-label="View calendar"
            as={MetaLink}
            fontSize="lg"
            href={htmlLink}
            isExternal
            icon={<ExternalLinkIcon />}
          />
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Portal>
);
