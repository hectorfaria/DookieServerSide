import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import axios from 'axios';
import reducers from '../client/reducers/reducers';

export default () => {
	return createStore(reducers, {}, applyMiddleware(reduxThunk, promise));
};
