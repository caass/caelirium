import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import routes from '../routes.json';
import { Store } from '../store';
import Topology from './topology';
import Home from './home';

type Props = {
  store: Store;
  history: History;
};

const Root: React.FunctionComponent<Props> = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container m-auto p-4">
        <Switch>
          <Route path={routes.internal.TOPOLOGY} component={Topology} />
          <Route path={routes.internal.HOME} component={Home} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
