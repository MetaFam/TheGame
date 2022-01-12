import Build from 'components/Landing/sections/Build';
import Cards from 'components/Landing/sections/Cards';
import Frontier from 'components/Landing/sections/Frontier';
import Game from 'components/Landing/sections/Game';
import Intro from 'components/Landing/sections/Intro';
import JustWatch from 'components/Landing/sections/JustWatch';
import Optimal from 'components/Landing/sections/Optimal';
import Revolution from 'components/Landing/sections/Revolution';
import Together from 'components/Landing/sections/Together';
import Unplug from 'components/Landing/sections/Unplug';
import WhatWeDo from 'components/Landing/sections/WhatWeDo';
import Who from 'components/Landing/sections/Who';
import WildWeb from 'components/Landing/sections/WildWeb';
import React from 'react';

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
