import {
  Heading,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { QuestFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  quest: QuestFragmentFragment;
};

export const QuestTile: React.FC<Props> = ({ quest }) => (
  <MetaTile w="100%">
    <MetaTileHeader>
      <MetaLink
        as={`/quest/${quest.id}`}
        href="/quest/[id]"
        key={quest.id}
      >
        <Heading size="sm" color="white">
          {quest.title}
        </Heading>
      </MetaLink>
    </MetaTileHeader>
    <MetaTileBody>
      <VStack spacing={2} align="stretch">
        <Text fontFamily="mono" fontSize="sm" color="blueLight">
          {quest.description}
        </Text>
      </VStack>
    </MetaTileBody>
  </MetaTile>
);
