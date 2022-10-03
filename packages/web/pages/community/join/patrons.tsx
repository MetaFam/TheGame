import { PageContainer } from 'components/Container';
import { PatronJoin } from 'components/Patron/Join/PatronJoin';
import { HeadComponent } from 'components/Seo';
import { getPatrons } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons();
  console.log('patrons ', patrons);
  return {
    props: {
      patrons,
    },
    revalidate: 1,
  };
};

const JoinPatronsPage: React.FC<Props> = ({ patrons }) => (
  <PageContainer>
    <HeadComponent
      title="MetaGame Patrons Join"
      description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
      url="https://my.metagame.wtf/community/join/patrons"
    />
    <PatronJoin patrons={patrons.slice(0, 6)} />
  </PageContainer>
);

export default JoinPatronsPage;
