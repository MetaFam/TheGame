import React from 'react';
import Build from '../components/Landing/Sections/Build';
import Cards from '../components/Landing/Sections/Cards';
import Frontier from '../components/Landing/Sections/Frontier';
import Game from '../components/Landing/Sections/Game';
import Intro from '../components/Landing/Sections/Intro';
import JustWatch from '../components/Landing/Sections/JustWatch';
import Optimal from '../components/Landing/Sections/Optimal';
import Revolution from '../components/Landing/Sections/Revolution';
import Together from '../components/Landing/Sections/Together';
import Unplug from '../components/Landing/Sections/Unplug';
import WhatWeDo from '../components/Landing/Sections/WhatWeDo';
import Who from '../components/Landing/Sections/Who';
import WildWeb from '../components/Landing/Sections/WildWeb';
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