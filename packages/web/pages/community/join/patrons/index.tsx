import {
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  Image,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
// images
import BlueArrow from 'assets/patron/blue-arrow.png';
import { PageContainer } from 'components/Container';
import { BecomePatron } from 'components/Patron/Join/BecomePatron';
import { PatronJoin } from 'components/Patron/Join/PatronJoin';
import { RankedLeagues } from 'components/Patron/Join/RankedLeagues';
import { WhyPatron } from 'components/Patron/Join/WhyPatron';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React, { useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patronsLimit = 6;
  const patrons = await getPatrons(patronsLimit);
  return {
    props: {
      patrons,
    },
    revalidate: 1,
  };
};

const PatronsJoinLanding: React.FC<Props> = ({ patrons }) => {
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Patrons Join"
        description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
        url="https://my.metagame.wtf/community/join/patrons"
      />
      <PatronJoin patrons={patrons} />

      {/* Why be a Patron? */}
      <WhyPatron />

      {/* Ranked Leagues & Perks */}

      <RankedLeagues />

      {/* Other patrons include... */}

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        Other patrons include...
      </Text>

      <Flex direction="column" width="100%" align="center">
        <PatronList patrons={patrons} />
        <Box mt={12} mb={4} px={2}>
          <MetaButton
            as="a"
            variant="link"
            href="community/patrons"
            maxW=""
            p="4"
          >
            LOAD MORE
          </MetaButton>
        </Box>
      </Flex>

      {/* Section: How to become a patron? */}
      <BecomePatron />

      {/* Back to Top button */}
      <VStack>
        <Image src={Octopus} pt={8} />
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

export default PatronsJoinLanding;
