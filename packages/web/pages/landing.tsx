import React from 'react';
import Intro from '../components/Landing/Intro';
import Game from '../components/Landing/Game';
import Build from '../components/Landing/Build';
import Revolution from '../components/Landing/Revolution';
import WildWeb from '../components/Landing/WildWeb';
import Frontier from '../components/Landing/Frontier';
import Together from '../components/Landing/Together';
import WhatWeDo from '../components/Landing/WhatWeDo';
import Optimal from '../components/Landing/Optimal';
import Unplug from '../components/Landing/Unplug';
import Who from '../components/Landing/Who';
import JustWatch from '../components/Landing/JustWatch';
import Cards from '../components/Landing/Cards';

function Landing(): JSX.Element {
  return <div>
    <Intro />
    <Game />
    <Build />
    <Revolution/>
    <WildWeb />
    <Frontier />
    <Together /> 
    <WhatWeDo /> 
    <Optimal />
    <Unplug />
    <Who />
    <Cards /> 
    <JustWatch />

  </div>;
}

export default Landing;
