import {combineReducers} from 'redux';
import isLogged from './reducers/isLogged';
import suite from './reducers/suite';
import nav from './reducers/nav';

const allReducers = combineReducers({isLogged, suite, nav});

export default allReducers;