import { PageContainer } from 'components/Container';
import { Build } from 'components/Landing/Build';
import { Game } from 'components/Landing/Game';
import { Intro } from 'components/Landing/Intro';
import { JustWatch } from 'components/Landing/JustWatch';
import { Optimal } from 'components/Landing/Optimal';
import { Revolution } from 'components/Landing/Revolution';
import { Together } from 'components/Landing/Together';
import { WhatWeDo } from 'components/Landing/WhatWeDo';
import { Who } from 'components/Landing/Who';
import { WildWeb } from 'components/Landing/WildWeb';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const Landing: React.FC = () => (
  <PageContainer p={0}>
    <Intro />
    <Game />
    <Build />
    <Revolution />
    <WildWeb />
    <Together />
    <WhatWeDo />
    <Optimal />
    <Who />
    <JustWatch />
  </PageContainer>
);

export default Landing;
