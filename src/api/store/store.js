import { createStore, applyMiddleware} from 'redux';
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
