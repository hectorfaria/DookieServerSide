import { combineReducers } from 'redux';
import HomeReducer from './homereducer';
import authReducer from './authreducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	post: HomeReducer,
	form: formReducer,
	movie: HomeReducer,
	auth: authReducer,
});

export default rootReducer;
