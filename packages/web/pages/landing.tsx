import React from 'react';
import Intro from '../components/Landing/Intro';
import Game from '../components/Landing/Game';
import Build from '../components/Landing/Build';
function Landing(): JSX.Element {
  return <div>
    <Intro />
    <Game /> 
    <Build />
  </div>;
}

export default Landing;
