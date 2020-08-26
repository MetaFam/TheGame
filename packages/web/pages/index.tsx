import {
  Avatar,
  Heading,
  HStack,
  MetaTag,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { getPlayers } from 'graphql/getPlayers';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { PlayerContacts } from '../components/Player/PlayerContacts';
import BackgroundImage from '../public/images/login-background.jpg';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const players = await getPlayers();
  return {
    props: {
      players,
    },
  };
};

const Home: React.FC<Props> = ({ players }) => (
  <PageContainer backgroundImage={`url(${BackgroundImage})`}>
    <SimpleGrid columns={[1, null, 2, 3]} spacing="8">
      {players.map((p) => (
        <VStack
          key={p.id}
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          py="6"
          px="4"
          spacing="6"
        >
          <MetaLink
            as={`/player/${p.username}`}
            href="player/[username]"
            key={p.id}
          >
            <VStack>
              <Avatar
                size="xl"
                src={getPlayerImage(p)}
                name={getPlayerName(p)}
              />
              <Heading size="xs">{getPlayerName(p)}</Heading>
            </VStack>
          </MetaLink>
          <Wrap>
            <MetaTag
              backgroundColor={p.rank?.toLowerCase()}
              size="md"
              color="blackAlpha.600"
            >
              {p.rank}
            </MetaTag>
            <MetaTag size="md">XP: {Math.floor(p.totalXp)}</MetaTag>
          </Wrap>

          {p.daohausMemberships.length ? (
            <VStack spacing={2}>
              <Text fontFamily="mono" fontSize="sm" color="blueLight">
                MEMBER OF
              </Text>
              <Wrap justify="center">
                {p.daohausMemberships.map((member) => (
                  <MetaTag key={member.id} size="md" fontWeight="normal">
                    {member.moloch.title}
                  </MetaTag>
                ))}
              </Wrap>
            </VStack>
          ) : null}

          {p.Accounts.length ? (
            <VStack spacing={2}>
              <Text fontFamily="mono" fontSize="sm" color="blueLight">
                CONTACT
              </Text>
              <HStack mt="2">
                <PlayerContacts player={p} />
              </HStack>
            </VStack>
          ) : null}
        </VStack>
      ))}
    </SimpleGrid>
  </PageContainer>
);

export default Home;
