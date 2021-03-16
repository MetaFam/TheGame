import { PageContainer } from 'components/Container';
import { PatronList } from 'components/PatronList';
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

const PatronsPage: React.FC<Props> = ({ patrons }) => {
  return (
    <PageContainer>
      <PatronList patrons={patrons} />
    </PageContainer>
  );
};

export default PatronsPage;
