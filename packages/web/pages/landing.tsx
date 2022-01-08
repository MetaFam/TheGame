import React from 'react';

import Build from '../components/Landing/Build';
import Cards from '../components/Landing/Cards';
import Frontier from '../components/Landing/Frontier';
import Game from '../components/Landing/Game';
import Intro from '../components/Landing/Intro';
import JustWatch from '../components/Landing/JustWatch';
import Optimal from '../components/Landing/Optimal';
import Revolution from '../components/Landing/Revolution';
import Together from '../components/Landing/Together';
import Unplug from '../components/Landing/Unplug';
import WhatWeDo from '../components/Landing/WhatWeDo';
import Who from '../components/Landing/Who';
import WildWeb from '../components/Landing/WildWeb';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});
const Landing: React.FC = () => (
  <div>
    <Intro />
    <Game />
    <Build />
    <Revolution />
    <WildWeb />
    <Frontier />
    <Together />
    <WhatWeDo />
    <Optimal />
    <Unplug />
    <Who />
    <Cards />
    <JustWatch />
  </div>
);

export default Landing;
