import { omit, mapKeys } from 'lodash';
import { FETCH_POSTS, FETCH_POSTS2, DELETE_POSTS, FETCH_MOVIES } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case DELETE_POSTS:
			return omit(state, action.payload);
		case FETCH_POSTS2:
			return { ...state, [action.payload.data.id]: action.payload.data };
		case FETCH_POSTS:
			return mapKeys(action.payload.data, 'id');
		case FETCH_MOVIES:
			return mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}
