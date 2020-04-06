import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import routes from './routes.json';
import { Store } from '../store';
import Counter from './counter';
import Topology from './topology';
import Home from './home';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={routes.COUNTER} component={Counter} />
        <Route path={routes.TOPOLOGY} component={Topology} />
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
