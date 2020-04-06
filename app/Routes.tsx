import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import TopologyPage from './containers/TopologyPage';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.TOPOLOGY} component={TopologyPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  );
}
