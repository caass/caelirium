import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';

import { Map, Home } from 'react-feather';

import routes from './routes.json';
import { Store } from '../redux/store';

import TopologyContainer from './topology';
import HomeContainer from './home';

import Dock from '../components/dock';
import { ContainerProps } from '../components/container';

type Props = {
  store: Store;
  history: History;
};

type Pages = {
  path: string;
  container: React.FunctionComponent<ContainerProps>;
  icon: React.ComponentType;
  name: string;
}[];

const pages: Pages = [
  {
    path: routes.TOPOLOGY,
    container: TopologyContainer,
    icon: Map,
    name: 'Network Topology'
  },
  {
    path: routes.HOME,
    container: HomeContainer,
    icon: Home,
    name: 'Home'
  }
];

const Root: React.FunctionComponent<Props> = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container m-auto p-4 h-full">
        <Switch>
          {pages.map(({ path, container: Page }, i) => (
            <Route
              key={path}
              path={path}
              render={() => (
                <Page
                  prev={
                    i < pages.length - 1
                      ? {
                          path: pages[i + 1].path
                        }
                      : undefined
                  }
                  next={
                    i > 0
                      ? {
                          path: pages[i - 1].path
                        }
                      : undefined
                  }
                />
              )}
            />
          ))}
        </Switch>
        <Dock icons={pages} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
