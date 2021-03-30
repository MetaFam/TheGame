import { Flex, FormControl, FormHelperText, FormLabel, Input, MetaHeading, SelectSearch } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React, { useMemo, useState } from 'react';

type Props = {
  legacyGuilds: GuildFragmentFragment[];
  guild: GuildFragmentFragment;
};

type GuildSelection = {
  label: string;
  value: string;
};

export const GuildJoinSetup: React.FC<Props> = ({ guild, legacyGuilds }) => {
  const [selectedGuild, setSelectedGuild] = useState<GuildSelection>();
  const [workingGuild, setWorkingGuild] = useState(guild);

  const makeGuildSelection = (g: GuildFragmentFragment): GuildSelection => {
    return {
      label: g.name,
      value: g.guildname,
    };
  } 

  const guildSelections = useMemo(() => {
    return legacyGuilds.map(g => makeGuildSelection(g));
  }, [legacyGuilds]);
  
  const handleExistingGuildSelection = (selection: GuildSelection) => {
    if (selection == null) return;
    setSelectedGuild(selection);
    const matchingGuild = legacyGuilds.find(g => g.guildname === selection.value);
    if (matchingGuild != null) {
      setWorkingGuild(matchingGuild);
    }
  };

  return (
    <FlexContainer flex="1" justify="start" mt={5}>
      <MetaHeading textAlign="center" mb={10} size="md">
        Add guild information
      </MetaHeading>
      { /* TODO get design input, change content and make responsive */ }
      <Flex
        direction="column"
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        p="6"
        my="6"
        w="100%"
        align="stretch"
        justify="space-between"
      >
        <FormControl id="existingguild">
          <FormLabel>Select an existing guild to pre-fill this form.</FormLabel>
          <SelectSearch
            value={selectedGuild}
            onChange={(value) => handleExistingGuildSelection(value as GuildSelection)}
            options={guildSelections}
          />
        </FormControl>  

        <FormControl id="guildname">
          <FormLabel>Guildname</FormLabel>
          <Input type="text" value={workingGuild.guildname} />
          <FormHelperText>A unique name for your guild, like a username.</FormHelperText>
        </FormControl>
      </Flex>
    </FlexContainer>
  );
};
