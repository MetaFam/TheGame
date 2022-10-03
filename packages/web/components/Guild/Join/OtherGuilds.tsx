import { Container, Heading } from '@metafam/ds';
import { GuildList } from 'components/Guild/GuildList';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const guilds = await getGuilds();
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

/**
 * This isn't working, have inlined it in packages/web/pages/Guild/Join/index.tsx
 * TypeError: Cannot read properties of undefined (reading 'map')
 */

const OtherGuilds: React.FC<Props> = ({ guilds }) => (
  <Container
    as="section"
    className="mg-guild-join-section" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
  >
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      Other guilds include &hellip;
    </Heading>
    <Container w="100%" centerContent>
      <GuildList {...{ guilds }} />
    </Container>
  </Container>
);

export default OtherGuilds;