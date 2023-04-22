import { Heading, Link, Prose, Text } from '@metafam/ds';
import { isSGML } from '@metafam/utils';
import { MarkdownViewer as Markdown } from 'components/MarkdownViewer';
import { QuestFragment } from 'graphql/autogen/types';
import React from 'react';
import { safelyParseNChakrifyHtml } from 'utils/stringHelpers';

type Props = {
  quest: QuestFragment;
};

export const QuestDetailsDescription: React.FC<Props> = ({ quest }) => {
  const descIsHtml = isSGML(quest.description ?? '');
  const parsedDescription = descIsHtml
    ? safelyParseNChakrifyHtml(quest.description ?? '')
    : null;
  return (
    <>
      <Prose>
        <Text as="p">
          TEST CONTENT DELETE LATER We need more knowledge to spread!
        </Text>
        <Text as="p">Got some knowledge? Spread it!</Text>
        <Text as="p">
          Seriously though, MetaGame is meant to be a place where people learn
          &amp; share their knowledge with others so we can all level up
          together.
        </Text>
        <Text as="p">
          If you got knowledge in anything related to Web3, working in or
          building decentralized organizations, any skill that might be useful
          in remote work or even something related to personal development -
          please say so &amp; run a workshop, if there’s interest.
        </Text>

        <Heading as="h2" fontFamily="body">
          Step 1
        </Heading>

        <Text as="p">
          Simply go to the
          <Link
            href="https://discord.com/channels/629411177947987986/735461293980516405"
            isExternal
            whiteSpace="nowrap"
          >
            #🧠-brain-exchange
          </Link>{' '}
          channel &amp; use the template there to post about the thing you could
          help teach others.
        </Text>

        <Heading as="h2" fontFamily="body">
          Step 2
        </Heading>

        <Text as="p">
          Go back to the channel &amp; check if other people expressed interest
          in what you want to teach them. If you’re happy with the number of the
          reactions, proceed with setting up a time for the event.
        </Text>
        <Text as="p">
          You can either simply pick that works for you or use something like
          Lettuce to get input from the people who are interested in your
          workshop.
        </Text>
        <Text as="p">Actual content follows 👇</Text>
      </Prose>

      {descIsHtml ? (
        <Prose>{parsedDescription}</Prose>
      ) : (
        <Markdown>{quest.description}</Markdown>
      )}
    </>
  );
};
