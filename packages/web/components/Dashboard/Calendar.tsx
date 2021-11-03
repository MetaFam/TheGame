import {
  Box,
  ButtonGroup,
  CalendarIcon,
  ExternalLinkIcon,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  VStack,
} from '@metafam/ds';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

export const Calendar: React.FC = () => {
  const [calendar, setCalendar] = useState<
    {
      day: string;
      events: {
        title: string;
        description: string;
        start: string;
        end: string;
        day: string;
      }[];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const fetchResponse = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vQw-djV3Ay4Snvu6YzlhQbIMP7m0rTUXyJiYLMhuTo_CKHNMoI14mVB6-hw2JrmZLIz29_wBY4j4UhZ/pub?output=csv',
        );
        const data = await fetchResponse.text();
        const eventsList = data
          .replace(/(\n)/gm, '')
          .split(/[\r]/)
          .map((l) => l.split(','))
          .map((event) => ({
            title: event[0],
            description: event[1],
            start: format(new Date(Number(event[2])), 'HH:mm'),
            end: format(new Date(Number(event[3])), 'HH:mm'),
            day: format(new Date(Number(event[2])), 'iiii • dd LLL yyyy'),
          }));

        const daysList: React.SetStateAction<string[]> = [];
        const map = new Map();
        eventsList.forEach((item) => {
          if (!map.has(item.day)) {
            map.set(item.day, true); // set any value to Map
            daysList.push(item.day);
          }
        });

        const preparedEvents = daysList.map((day) => {
          const allEventsForDay = eventsList.filter(
            (event) => event.day === day,
          );
          return {
            day,
            events: allEventsForDay,
          };
        });

        setCalendar(preparedEvents);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <VStack
          as="ol"
          className="calendar"
          width="100%"
          mt={5}
          ml={0}
          sx={{
            listStyle: 'none',
          }}
        >
          {calendar.map((entry) => (
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
              key={entry.day}
            >
              <Box
                as="h3"
                fontSize="sm"
                className="calendar__day--title"
                mb={3}
                px={5}
              >
                {entry.day}
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
                {entry.events.map((event) => (
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
                        title={event.title}
                        start={event.start}
                        end={event.end}
                      />
                      <EventPopover
                        title={event.title}
                        start={event.start}
                        end={event.end}
                        description={event.description}
                      />
                    </Popover>
                  </Box>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </div>
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
      <Box as="h4" fontSize="md" fontFamily="body" fontWeight="bold">
        {title}
      </Box>
      <Box as="span" fontWeight="100" fontFamily="body" fontSize="xs">
        {`${start} – ${end}`}
      </Box>
    </Box>
  </PopoverTrigger>
);

interface EventPopoverType {
  title: string;
  start: string;
  end: string;
  description: string;
}

const EventPopover = ({ title, start, end, description }: EventPopoverType) => (
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
          <Box as="dd" fontWeight="100" fontFamily="body" fontSize="xs">
            {`${start} – ${end}`}
          </Box>
          {description !== 'empty' && (
            <Box>
              <Box as="dt">Description</Box>
              <Box as="dd" fontWeight="100" fontFamily="body" fontSize="xs">
                {description.replace(/(<([^>]+)>)/gi, '')}
              </Box>
            </Box>
          )}
        </Box>
      </PopoverBody>
      <PopoverFooter borderTopWidth={0}>
        <ButtonGroup variant="ghost" colorScheme="cyan">
          <IconButton
            aria-label="Add to your calendar"
            icon={<CalendarIcon />}
          />
          <IconButton aria-label="View calendar" icon={<ExternalLinkIcon />} />
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Portal>
);
