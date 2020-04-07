/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import topologyReducer from './containers/topology/slice';

const createRootReducer = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    topology: topologyReducer
  });
};

export default createRootReducer;
