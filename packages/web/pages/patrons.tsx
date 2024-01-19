import {
  ArrowUpIcon,
  Box,
  Button,
  Center,
  Image,
  Link,
  MetaButton,
  Text,
  Tooltip,
  VisuallyHidden,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
import { PageContainer } from 'components/Container';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React, { useRef, useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  /**
   * Get all the Patrons
   * (MetaGame rules say there can be 150 max, so we'll limit the query to that many)
   */
  const patronsLimit = 150;
  const patrons = await getPatrons(patronsLimit);
  const pSeedPrice = await getPSeedPrice().catch((error) => {
    console.error('Error fetching pSeed price', error);
    return null;
  });
  return {
    props: {
      patrons,
      pSeedPrice,
    },
    revalidate: 1,
  };
};

const PatronsPage: React.FC<Props> = ({ patrons, pSeedPrice }) => {
  /**
   * For the back to top link
   */
  const topRef = useRef<HTMLHeadingElement>(null);
  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Settings for the Load More patrons button
   */
  /* How many patrons were found, in total? */
  const totalItems = patrons.length;

  /* How many patrons to show initially, and how many more to load each time the Load More button is clicked? */
  const showHowMany = 30;

  /* How many Patrons are visible right now? */
  const [visible, setVisible] = useState(showHowMany);

  /* Increment the number visible by `showHowMany` when the Load More button is clicked */
  const handleShowMoreItems = () => {
    setVisible((prevValue) => prevValue + showHowMany);
  };

  /**
   * Print out the Load More button
   * If there are no more patrons to load, disable the button and add a tooltip that says 'no more to load'
   */
  function renderLoadMoreButton() {
    const buttonStyles = {
      minW: '10rem',
    };

    if (visible < totalItems) {
      /* When there are more items to show */
      return (
        <MetaButton onClick={handleShowMoreItems} {...buttonStyles}>
          Load more
        </MetaButton>
      );
    }

    /* When there are no more items to show */
    return (
      <Tooltip label="No more to load" aria-label="A tooltip">
        <MetaButton as="span" isDisabled {...buttonStyles}>
          Load more
        </MetaButton>
      </Tooltip>
    );
  }

  /**
   * Print text 'Showing X of Y items'
   * if X (visible items) is greater than Y (total items), then just print Y of Y
   * (or X could overflow and print 60 of 43)
   */
  function renderShowingXOfYItems() {
    const showingXOf = visible >= totalItems ? totalItems : visible;
    const showingYOf = totalItems;

    return (
      <Text>
        Showing {showingXOf} of {showingYOf} patrons
      </Text>
    );
  }

  return (
    <PageContainer overflow="hidden">
      <HeadComponent
        title="Patrons"
        description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
        url="https://my.metagame.wtf/patrons"
      />

      {/* This is mostly here as a placeholder for the back to top link, but screenreaders will read out the heading
       * It is set as="h1" b/c the Chakra library VisuallyHidden component is a span by default
       */}
      <VisuallyHidden as="h1" ref={topRef}>
        Patrons of MetaGame
      </VisuallyHidden>

      {/* VStack is used to make a consistent gap between the Join CTA, the Patrons list, the Load More button, the X of Y patrons text, and the Octo image and back to top link */}
      <VStack maxW="7xl" w="100%" spacing={{ base: 6, md: 8 }}>
        <Center
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={{ base: '400', md: '700' }}
          marginTop={{ base: 3, sm: 0 }}
          w="80vw"
        >
          <Text as="p" textAlign="center">
            Want to get on this leaderboard and rank high? Why not{' '}
            <Link
              href="/signup?tab=patron"
              color="pink.300"
              textDecoration="underline"
              whiteSpace="nowrap"
            >
              become a patron
            </Link>{' '}
            or up your stake in the Seed farm?
          </Text>
        </Center>

        <PatronList
          patrons={patrons.slice(0, visible)}
          pSeedPrice={pSeedPrice}
        />

        {/* Load More button */}
        {renderLoadMoreButton()}

        {/* Showing X of Y patrons text */}
        {renderShowingXOfYItems()}

        {/* Back to top link */}
        <Image src={Octopus.src} pt={8} />

        <Box pb={4}>
          <Button
            leftIcon={<ArrowUpIcon />}
            variant="ghost"
            color="whiteAlpha.700"
            bgColor="whiteAlpha.50"
            _hover={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.200' }}
            onClick={handleBackClick}
          >
            Back to top
          </Button>
        </Box>
      </VStack>
    </PageContainer>
  );
};
export default PatronsPage;
