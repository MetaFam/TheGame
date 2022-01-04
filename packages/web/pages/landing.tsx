import React from 'react';
import Intro from '../components/Landing/Intro';
import Game from '../components/Landing/Game';
import Build from '../components/Landing/Build';
import Revolution from '../components/Landing/Revolution';
import WildWeb from '../components/Landing/WildWeb';
import Frontier from '../components/Landing/Frontier';
import Together from '../components/Landing/Together';

function Landing(): JSX.Element {
  return <div>
    <Intro />
    <Game />
    <Build />
    <Revolution/>
    <WildWeb />
    <Frontier />
    <Together /> 
  </div>;
}

export default Landing;
