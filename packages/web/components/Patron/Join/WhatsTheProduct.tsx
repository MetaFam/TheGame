import { Container, Heading, ListItem, Text, UnorderedList } from '@metafam/ds';
import React from 'react';

export const WhatsTheProduct: React.FC = () => (
  <Container as="section" className="mg-patron-join-section">
    <Heading as="h2" fontFamily="mono" fontWeight={700} mb={[4, 4, 4, 12]}>
      So what’s the product, what’s the revenue model???
    </Heading>

    <Container
      className="mg-patron-join-card-bg" // CSS class defined in packages/web/pages/Patron/Join/index.tsx
      maxW="3xl"
      p={6}
    >
      <Text>
        There are a few, actually, along with various monetization &amp;
        sustainability strategies. If you want to dig deeper, it might be best
        to dig down the raids section &amp; ask some questions or read the
        Purplepaper&nbsp;🙃
      </Text>
    </Container>

    <Heading
      as="h2"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
      mt={{ base: 8, md: 12 }} // Match the spacing of the VStack that wraps all of these headings+boxes
    >
      Why you should become a Patron of MetaGame?
    </Heading>

    <Container
      className="mg-patron-join-card-bg" // CSS class defined in packages/web/pages/Patron/Join/index.tsx
      maxW="3xl"
      p={6}
    >
      <Text>
        We prefer our patrons inrinsically motivated, so the main reason you'd
        want to become a patron is just the fact you love this whole idea of
        MetaGame &amp; want to see it succeed.
      </Text>
      <UnorderedList>
        <ListItem>
          If you weren’t so damn busy, you’d probably join in on building it,
          but at this point, its easier for you to just pitch in a bucket of
          water &amp; support the movement passively.
        </ListItem>
      </UnorderedList>
    </Container>
  </Container>
);
