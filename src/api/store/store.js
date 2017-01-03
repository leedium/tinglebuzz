import { createStore, applyMiddleware} from 'redux';
import combinedReducers from '../reducers/combinedReducers';
import thunk from 'redux-thunk';

function Store(initialState){
  return createStore(
    combinedReducers,
    initialState,
    applyMiddleware(thunk)
  );
}

export default Store;
