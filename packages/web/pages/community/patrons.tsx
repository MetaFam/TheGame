import { PageContainer } from 'components/Container';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patronsLimit = 150; // Get all the Patrons (MetaGame rules say there can be 150 max)
  // Weird - with no limit, we get 33 patrons (using staging db I guess)
  // With limit of 150 we get 42 patrons
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

const PatronsPage: React.FC<Props> = ({ patrons, pSeedPrice }) => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Patrons"
      description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
      url="https://my.metagame.wtf/community/patrons"
    />
    <PatronList {...{ patrons, pSeedPrice }} />
  </PageContainer>
);

export default PatronsPage;
