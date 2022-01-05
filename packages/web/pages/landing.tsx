import React from 'react';
import Intro from '../components/Landing/sections/Intro';
import Game from '../components/Landing/sections/Game';
import Build from '../components/Landing/sections/Build';
import Revolution from '../components/Landing/sections/Revolution';
import WildWeb from '../components/Landing/sections/WildWeb';
import Frontier from '../components/Landing/sections/Frontier';
import Together from '../components/Landing/sections/Together';
import WhatWeDo from '../components/Landing/sections/WhatWeDo';
import Optimal from '../components/Landing/sections/Optimal';
import Unplug from '../components/Landing/sections/Unplug';
import Who from '../components/Landing/sections/Who';
import JustWatch from '../components/Landing/sections/JustWatch';
import Cards from '../components/Landing/sections/Cards';

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
