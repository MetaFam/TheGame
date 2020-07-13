import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from './containers/Home';
import { Player } from './containers/Player';

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/player/:playerId">
      <Player />
    </Route>
    <Redirect to="/" />
  </Switch>
);
