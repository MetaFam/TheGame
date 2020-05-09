import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from './containers/Home';
import { Player } from './containers/Player';

export default function Routes() {
  return (
    <Switch>
      <Route path="/player/:playerId">
        <Player />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Redirect to="/"/>
    </Switch>
  );
}
