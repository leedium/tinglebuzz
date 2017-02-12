import { createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import combinedReducers from '../reducers/combinedReducers';

function Store(initialState){
  return createStore(
    combinedReducers,
    initialState,
    applyMiddleware(thunk),
  );
}

export default Store;
