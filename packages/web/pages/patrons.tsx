import {
  ArrowUpIcon,
  Box,
  Button,
  Heading,
  Image,
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
  /* 
   Get all the Patrons (MetaGame rules say there can be 150 max)
   Weird - with no limit, we get 33 patrons (using staging db I guess)
   With limit of 150 we get 42 patrons
   TODO(HHH-GH): remove most of this comment after testing it on on a deploy
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
  /* 
    For the back to top link
  */
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  /*
    For the Load More patrons button
  */
  /* How many patrons are there in total? */
  const totalItems = patrons.length;

  /* How many patrons to show initially, and how many more to load each time the Load More button is clicked */
  const showHowMany = 30;

  /* How many patrons are visible right now */
  const [visible, setVisible] = useState(showHowMany);

  /* What to do when the Load More button is clicked (i.e. increment the number visible by showHowMany) */
  const handleShowMoreItems = () => {
    setVisible((prevValue) => prevValue + showHowMany);
  };

  /* 
    Print out the Load More button
    If there are no more patrons to load, disable the button and add a tooltip that says 'no more to load'
  */
  function renderLoadMoreButton() {
    const buttonStyles = {
      minW: '12rem',
    };

    if (visible >= totalItems) {
      return (
        <Tooltip label="No more to load" aria-label="A tooltip">
          <MetaButton as="span" isDisabled {...buttonStyles}>
            Load more
          </MetaButton>
        </Tooltip>
      );
    }
    return (
      <MetaButton onClick={handleShowMoreItems} {...buttonStyles}>
        Load more
      </MetaButton>
    );
  }

  function renderShowingXOfYItems() {
    /* 
      Show X of Y items
      if X (visible items) is greater than Y (total items), then just print Y of Y
      (or X could overflow and print 60 of 43)
    */
    const showingXOf = visible >= totalItems ? totalItems : visible;
    const showingYOf = totalItems;

    return (
      <Text>
        Showing {showingXOf} of {showingYOf} patrons
      </Text>
    );
  }

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Patrons"
        description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
        url="https://my.metagame.wtf/community/patrons"
      />

      {/* This is mostly here as a placeholder for the back to top link but screenreaders will read out the heading */}
      <VisuallyHidden>
        <Heading
          fontSize="6xl"
          fontWeight={600}
          color="white"
          fontFamily="body"
          mb={[4, 4, 4, 12]}
          ref={topRef}
        >
          Patrons of MetaGame
        </Heading>
      </VisuallyHidden>

      {/* Make a consistent gap between the list, button, octo image, back to top link */}
      <VStack maxW="7xl" w="100%" spacing={{ base: 4, md: 8 }}>
        {/*
          Does it matter that I'm not using the spread operator anymore with this?
          If the ... was being used to make a copy to send in to PatronList, slice makes a copy, too
          Originally it was like this, printing all the Patrons at once
          <PatronList {...{patrons, pSeedPrice }} />
        */}

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
