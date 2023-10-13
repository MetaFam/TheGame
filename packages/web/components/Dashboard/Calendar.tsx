import {
  Box,
  ButtonGroup,
  CalendarAddIcon,
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
  Text,
  Tooltip,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { MarkdownViewer } from 'components/MarkdownViewer';
import type { GoogleCalEventType } from 'lib/hooks/useCalendar';
import { useCalendar } from 'lib/hooks/useCalendar';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

import { calendarID } from './config';

type GroupedEventsType = {
  date: string;
  events: GoogleCalEventType[];
};

export const Calendar: React.FC = () => {
  const [calendar, setCalendar] = useState<GroupedEventsType[]>([]);
  const [limit, setLimit] = useState(4);
  const { events, fetching, error } = useCalendar(limit);
  const calICS = `https://calendar.google.com/calendar/ical/${calendarID}%40group.calendar.google.com/public/basic.ics`;
  // const usersOffset = DateTime.local().offset / 60;
  // const usersOffsetString = usersOffset > 0 ? `+${usersOffset}` : usersOffset;

  // const getUrlStringFromDescription = (desc: string) => {
  //   const regex = /(?<=")[^"]+(?=")/g;
  //   const cover = desc ? desc.match(regex) : '';

  //   return cover;
  // }

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

  const handleLoadMore = () => {
    setLimit(limit + 4);
  };

  useEffect(() => {
    if (!fetching && calendar.length === 0 && events !== null) {
      const days = groupEventsByDay(events);
      setCalendar(days);
    }

    return () => {
      setCalendar([]);
    };
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
    <Flex direction="column" p={6} width="100%" height="100%">
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
          maxH="100%"
        >
          <HStack
            align={'center'}
            justifyContent={'flex-start'}
            gap={5}
            flexShrink={1}
            position="relative"
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

            <Tooltip
              label="Download ics"
              aria-label="Download ics"
              placement="bottom"
              hasArrow
            >
              <Box flexShrink={1}>
                <IconButton
                  as={MetaLink}
                  href={calICS}
                  isExternal
                  aria-label="Add calendar"
                  icon={<CalendarAddIcon />}
                  justifySelf="flex-end"
                  variant="ghost"
                  fontSize="2xl"
                  translateX={9}
                />
              </Box>
            </Tooltip>
          </HStack>
          <Box flexGrow={1} overflowY="auto" mb={9}>
            <HStack position="absolute" inset={0} top="auto" justify="center">
              <MetaButton
                variant="ghost"
                colorScheme="purple"
                bg="purpleTag70"
                onClick={handleLoadMore}
                disabled={limit >= 20}
                isDisabled={limit >= 20}
                w="full"
                borderTopRadius={0}
              >
                Load More
              </MetaButton>
            </HStack>
            <VStack
              as="ol"
              className="calendar"
              width="100%"
              mt={5}
              ml={0}
              px={0}
              pr={limit > 4 ? 3 : 0}
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
                    key={day.date}
                    _last={{
                      mb: 0,
                    }}
                  >
                    <Box
                      as="h3"
                      fontSize="sm"
                      fontFamily="body"
                      className="calendar__day--title"
                      mb={3}
                      pl={5}
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
