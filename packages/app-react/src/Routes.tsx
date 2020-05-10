import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from './containers/Home';
import { Player } from './containers/Player';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/player/:playerId">
        <Player />
      </Route>
      <Redirect to="/"/>
    </Switch>
  );
}
