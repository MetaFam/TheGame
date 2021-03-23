import {
  Box,
  Input,
MetaButton,
  MetaHeading,
  Select,   Text,
  VStack,
} from '@metafam/ds';
import { Quest_Insert_Input, QuestRepetition_Enum } from 'graphql/autogen/types';
import { InferGetStaticPropsType } from 'next';
import React, { useReducer } from 'react';

import { MetaLink } from '../../components/Link';
import { getGuilds } from '../../graphql/getGuilds';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const initialFormState: Quest_Insert_Input = {
  title: '',
  description: '',
  repetition: QuestRepetition_Enum.Personal,
  guild_id: '',
}

interface FormAction {
  key: string;
  value: any;
}

type FormReducer = (state: Quest_Insert_Input, action: FormAction) => Quest_Insert_Input
const formReducer: FormReducer = (state: Quest_Insert_Input, action: FormAction) => {
  const newState = { ...state };
  newState[action.key] = action.value;
  return newState;
}

function init(): Quest_Insert_Input {
  return initialFormState;
}

const CreateQuestPage: React.FC<Props> = ({ guilds }) => {
  const [state, dispatch] = useReducer<FormReducer, Quest_Insert_Input>(formReducer, initialFormState, init);

  return (
    <Box>
      <MetaLink href="/quests">Back to quests</MetaLink>
      <MetaHeading>
        Create quest
      </MetaHeading>
      <VStack>

        <Text>Title</Text>
        <Input
          background="dark"
          placeholder="Buidl stuff"
          isRequired
          value={state.title || ''}
          onChange={e => dispatch({ key: 'title', value: e.target.value })}
        />
        <Text>Description</Text>
        <Input
          background="dark"
          placeholder="Shill our guild"
          isRequired
          value={state.description || ''}
          onChange={e => dispatch({ key: 'description', value: e.target.value })}
        />
        <Text>Repetition</Text>
        <Select
          isRequired
          value={state.repetition || ''}
          onChange={e => dispatch({ key: 'repetition', value: e.target.value })}
        >
          {Object.entries(QuestRepetition_Enum).map(([key, value]) => (
            <option key={value} value={value}>{key}</option>
          ))}
        </Select>

        <Text>Guild</Text>
        <Select
          isRequired
          value={state.guild_id}
          onChange={e => dispatch({ key: 'guild_id', value: e.target.value })}
        >
          {guilds.map(guild => (
            <option key={guild.id} value={guild.id}>{guild.guildname}</option>
          ))}
        </Select>


        <MetaButton
          mt={10}
          loadingText="Creating quest..."
        >
          Create Quest
        </MetaButton>
      </VStack>
    </Box>
  );
}

export const getStaticProps = async () => {
  const guilds = await getGuilds();
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

export default CreateQuestPage
