import { PageContainer } from 'components/Container';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons();
  return {
    props: {
      patrons,
    },
    revalidate: 1,
  };
};

const PatronsPage: React.FC<Props> = ({ patrons }) => (
  <PageContainer>
    <HeadComponent
      title="Metagame's Patrons"
      description="Metagame is a Massive Online Coordination Game! Metagame's Patrons enable us to succeed by helping us with funds."
      url="https://my.metagame.wtf/patrons"
    />
    <PatronList patrons={patrons} />
  </PageContainer>
);

export default PatronsPage;
