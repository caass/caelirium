import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';

import { Map, Home } from 'react-feather';

import routes from '../routes.json';
import { Store } from '../store';

import TopologyContainer from './topology';
import HomeContainer from './home';

import Dock from '../components/dock';

type Props = {
  store: Store;
  history: History;
};

type Pages = {
  path: string;
  container: React.FunctionComponent;
  icon: React.ComponentType;
  name: string;
}[];

const pages: Pages = [
  {
    path: routes.internal.TOPOLOGY,
    container: TopologyContainer,
    icon: Map,
    name: 'Network Topology'
  },
  {
    path: routes.internal.HOME,
    container: HomeContainer,
    icon: Home,
    name: 'Home'
  }
];

const Root: React.FunctionComponent<Props> = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container m-auto p-4">
        <Switch>
          {pages.map(({ path, container }) => (
            <Route key={path} path={path} component={container} />
          ))}
        </Switch>
        <Dock icons={pages} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
