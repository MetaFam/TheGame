import { Container, Heading, ListItem, Text, UnorderedList } from '@metafam/ds';

export const WhyJoin: React.FC = () => (
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
      Why have your guild join MetaGame?
    </Heading>

    <Container
      className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
      maxW="3xl"
      p={8}
    >
      <Text mb={4}>A few reasons, actually!</Text>
      <Text mb={4}>
        <Text as="strong">Firstly</Text>, because you feel aligned with the
        vision &amp; want to be a part of this “new world” puzzle.
      </Text>
      <Text>You may also want to become a part of MetaGame if you:</Text>
      <UnorderedList>
        <ListItem>
          Want access to a network of pioneers, helpers, stress testers &amp;
          early adopters.
        </ListItem>
        <ListItem>
          Need access or connections to knowledge &amp; resources you need for
          your guild.
        </ListItem>
        <ListItem>
          Want a place to offer your service or tools to other DAOs or integrate
          it into MetaOS.
        </ListItem>
        <ListItem>
          Are interested in using MetaGame as a platform or deploying MetaOS on
          your own.
        </ListItem>
        <ListItem>
          Need a little help spreading the word &amp; getting your project out
          there.
        </ListItem>
        <ListItem>Want help onboarding people into your DAO.</ListItem>
      </UnorderedList>
    </Container>
  </Container>
);
