import {
  Flex,
  MetaButton,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  Switch,
  Text,
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
import React, { useState } from 'react';

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

  const [limit, setLimit] = useState<FilterString>(limitOptions[0]);
  const [order, setOrder] = useState<FilterString>(orderOptions[0]);
  const [status, setStatus] = useState<FilterString>(statusOptions[0]);
  const [guild, setGuild] = useState<FilterString>(guildOptions[0]);
  const [roles, setRoles] = useState<FilterString[]>([]);

  return (
    <Wrap justifyContent="center">
      <Wrap
        transition="all 0.25s"
        py={6}
        style={{ backdropFilter: 'blur(7px)' }}
        position="sticky"
        top="-1px"
        borderTop="1px solid transparent"
        zIndex={1}
        justifyContent="center"
        w="100%"
        maxW="79rem"
        bg="whiteAlpha.200"
        px="1.5rem"
        borderRadius="6px"
      >
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
        {aggregates.guilds.length ? (
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
        ) : null}
        {roleChoices.length && (
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
        )}

        {myId && (
          <WrapItem>
            <Flex align="center">
              <MetaButton
                size="md"
                colorScheme="cyan"
                variant="outline"
                borderWidth="2px"
                borderRadius="4px"
                color="cyan.500"
                px={4}
                onClick={() =>
                  setQueryVariable(
                    'created_by_player_id',
                    queryVariables.createdByPlayerId ? '' : myId,
                  )
                }
              >
                <Text mr={2}>Created By Me</Text>
                <Switch
                  isChecked={myId && queryVariables.createdByPlayerId === myId}
                />
              </MetaButton>
            </Flex>
          </WrapItem>
        )}
      </Wrap>
      {quests && (
        <WrapItem>
          <Text align="center" fontWeight="bold">
            {quests.length} quests
          </Text>
        </WrapItem>
      )}
    </Wrap>
  );
};
