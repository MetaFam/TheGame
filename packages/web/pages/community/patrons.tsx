import { PageContainer } from 'components/Container';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons();
  const pSeedPrice = await getPSeedPrice();
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
    <PatronList patrons={patrons} pSeedPrice={pSeedPrice} />
  </PageContainer>
);

export default PatronsPage;
