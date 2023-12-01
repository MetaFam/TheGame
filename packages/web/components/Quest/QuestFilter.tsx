import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  Switch,
  Text,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  GetQuestsQueryVariables,
  Order_By,
  PlayerRole,
  QuestFragment,
  QuestStatus_Enum,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import { QueryVariableSetter, QuestAggregates } from 'lib/hooks/quests';
import { useIsSticky } from 'lib/hooks/useIsSticky';
import React, { useRef, useState } from 'react';

type Props = {
  quests: Array<QuestFragment>;
  aggregates: QuestAggregates;
  queryVariables: GetQuestsQueryVariables;
  setQueryVariable: QueryVariableSetter;
  roleChoices: Array<PlayerRole>;
};

type FilterString = { value: string; label: string };

/* TODO
- text search
- remove limit
 */
export const QuestFilter: React.FC<Props> = ({
  quests,
  aggregates,
  queryVariables,
  setQueryVariable,
  roleChoices,
}) => {
  const { user } = useUser();
  const myId = user?.id;

  const limitOptions = ['10', '20', '50'].map((n) => ({ label: n, value: n }));

  const orderOptions = [
    {
      label: 'Newest',
      value: Order_By.Desc,
    },
    {
      label: 'Oldest',
      value: Order_By.Asc,
    },
  ];

  const statusOptions = [
    {
      label: 'Open',
      value: QuestStatus_Enum.Open,
    },
    {
      label: 'Closed',
      value: QuestStatus_Enum.Closed,
    },
  ];

  const guildOptions = [
    {
      label: 'All guilds',
      value: '',
    },
  ].concat(
    aggregates.guilds.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  );

  const roleOptions = roleChoices.map(({ label, role }) => ({
    label,
    value: role,
  }));

  const [limit, setLimit] = useState<FilterString>(limitOptions[2]);
  const [order, setOrder] = useState<FilterString>(orderOptions[0]);
  const [status, setStatus] = useState<FilterString>(statusOptions[0]);
  const [guild, setGuild] = useState<FilterString>(guildOptions[0]);
  const [roles, setRoles] = useState<FilterString[]>([]);

  /**
   * Quest filters container appearance and behaviour
   * Basics
   * - the filters are in a box
   * - the box sticks to the top of the screen on scrolls IF the screen is wider than the md breakpoint
   * - if the screen is not wider than the md breakpoint, it stays as a plain box, no sticky behaviour
   *
   * Hack warning (HHH-GH)
   * - When the box is not sticky, it is full *container* width i.e. maxW 7xl
   * - When the box is sticky, it breaks out of the page container to full *screen* width
   * - Previously that was achieved with `w={isSticky ? 'calc(100% + 6rem)' : '100%'}`
   * - BUT there was a bug that meant it got stuck at full width for certain screenwidths (betwen 768px/md and 1024px)
   * - Solution: set the width to 98vw (values greater than 98vw also trigger the bug), fill in the 2vw gap with a box-shadow
   * - lmk if you have a better solution :)
   *
   * The code for this was adapted from work done on components/Player/Filter/PlayerFilter.tsx
   */

  const isSmallScreen = useBreakpointValue({ base: true, md: false }); // Filters do not become sticky for small screens
  const stickyRef = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(stickyRef);

  // Filters box - how it looks when it's sticky or not sticky
  // Styles that are not toggled
  const questFiltersBoxCommonStyles = {
    backdropFilter: 'blur(7px)',
    marginBottom: '6',
    // These styles on top and borderTop are needed for it to stick right
    borderTop: '1px solid transparent',
    top: '-1px',
    transition: 'all 0.25s',
    zIndex: '1',
  };

  // The styles to toggle for sticky/not sticky
  // How it looks when it's sticky
  const questFiltersStickyStyles = {
    bg: 'purpleTag70',
    borderRadius: '0',
    boxShadow:
      '-1vw 0px 0px var(--chakra-colors-purpleTag70), 1vw 0px 0px var(--chakra-colors-purpleTag70)', // Sticky, fills in the gap left by the 98vw
    maxW: 'auto',
    position: 'sticky',
    px: '2.5em',
    py: '1em',
    w: '98vw', // If it's higher than 98vw it gets stuck full width and won't unstick, see above 'Hack warning'
  };

  // How it looks when it's not sticky
  const questFiltersNotStickyStyles = {
    bg: 'whiteAlpha.200',
    borderRadius: '6px',
    maxW: '7xl',
    px: '1.5em',
    py: '1em',
    w: '100%',
  };

  // Adds/removes styles on the search and filters container
  function toggleStickyStyles() {
    // It's never sticky if it's a small screens
    if (!isSticky || isSmallScreen) {
      return questFiltersNotStickyStyles;
    }
    // Filters are sticky
    return questFiltersStickyStyles;
  }

  return (
    <>
      {/**
       * Search and filters container
       * This Box provides a container and background for the Quest filters
       * Styles for its appearance are provided in variables/by functions so they can be switched around easily
       * (for e.g. instead of using nested ternary operators [which cause lint errors anyway])
       * Basics
       * - toggleStickyStyles() - adds/removes styles when the box is sticky/not sticky
       * - searchFiltersBoxCommonStyles - styles used for both sticky/not sticky
       * - any props added below on the Box will override styles set in the vars above
       */}
      <Box
        as="div"
        ref={stickyRef}
        {...questFiltersBoxCommonStyles}
        {...toggleStickyStyles()}
      >
        <Flex direction="column" width="full" maxW="7xl" mx="auto">
          <Wrap>
            <WrapItem>
              <MetaFilterSelectSearch
                title={`Limit: ${limit.label}`}
                styles={metaFilterSelectStyles}
                hasValue={false}
                value={limit}
                onChange={(value) => {
                  const values = value as FilterString[];
                  const [v] = values.slice(-1);
                  if (v) {
                    setLimit(v);
                    setQueryVariable('limit', Number(v.value));
                  }
                }}
                options={limitOptions}
                disableEmpty
              />
            </WrapItem>
            <WrapItem>
              <MetaFilterSelectSearch
                title={`Order: ${order.label}`}
                styles={metaFilterSelectStyles}
                hasValue={false}
                value={order}
                onChange={(value) => {
                  const values = value as FilterString[];
                  const [o] = values.slice(-1);
                  if (o) {
                    setOrder(o);
                    setQueryVariable('order', o.value);
                  }
                }}
                options={orderOptions}
                disableEmpty
              />
            </WrapItem>
            <WrapItem>
              <MetaFilterSelectSearch
                title={`Status: ${status.label}`}
                styles={metaFilterSelectStyles}
                hasValue={false}
                value={status}
                onChange={(value) => {
                  const values = value as FilterString[];
                  const [s] = values.slice(-1);
                  if (s) {
                    setStatus(s);
                    setQueryVariable('status', s.value);
                  }
                }}
                options={statusOptions}
                disableEmpty
              />
            </WrapItem>
            {aggregates.guilds.length > 0 && (
              <WrapItem>
                <MetaFilterSelectSearch
                  title={`Guild: ${guild.label}`}
                  styles={metaFilterSelectStyles}
                  hasValue={false}
                  value={guild}
                  onChange={(value) => {
                    const values = value as FilterString[];
                    const [g] = values.slice(-1);
                    if (g) {
                      setGuild(g);
                      setQueryVariable('guildId', g.value);
                    }
                  }}
                  options={guildOptions}
                  disableEmpty
                />
              </WrapItem>
            )}
            {roleChoices.length > 0 && (
              <WrapItem>
                <MetaFilterSelectSearch
                  title="Roles"
                  styles={metaFilterSelectStyles}
                  hasValue={false}
                  value={roles}
                  onChange={(value) => {
                    const values = value as FilterString[];
                    const selectedRoles = values;

                    if (selectedRoles.length) {
                      setRoles(selectedRoles);
                      setQueryVariable(
                        'questRoles',
                        selectedRoles.map((x) => x.value),
                      );
                    } else {
                      setRoles([]);
                      setQueryVariable('questRoles', '');
                    }
                  }}
                  options={roleOptions}
                  disableEmpty
                />
              </WrapItem>
            )}
            {myId && (
              <WrapItem
                alignItems="center"
                borderRadius="4px"
                borderColor="borderPurple"
                borderWidth="2px"
                bg="dark"
              >
                <FormControl
                  display="flex"
                  alignItems="center"
                  mx={3}
                  minH="38px" // Match the height of the MetaFilterSelectSearch components
                >
                  <FormLabel
                    htmlFor="createdByMe"
                    mb={0}
                    style={{ cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    Created By Me
                  </FormLabel>
                  <Switch
                    id="createdByMe"
                    isChecked={
                      myId && queryVariables.createdByPlayerId === myId
                    }
                    onChange={() =>
                      setQueryVariable(
                        'createdByPlayerId',
                        queryVariables.createdByPlayerId ? '' : myId,
                      )
                    }
                  />
                </FormControl>
              </WrapItem>
            )}
          </Wrap>
        </Flex>
      </Box>
      {quests && (
        <Box width="full" maxW="7xl" mx="auto">
          <Text fontWeight="700" fontSize="xl">
            {quests.length} quests
          </Text>
        </Box>
      )}
    </>
  );
};
