import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './userReducer';

const combinedReducers = combineReducers({
  user: userReducer,
  routing: routerReducer,
});

export default combinedReducers;