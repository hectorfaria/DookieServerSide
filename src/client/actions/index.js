/*eslint-disable no-unused-vars*/
import axios from 'axios';
import { FETCH_URL, API_KEY, MOVIE_KEY } from '../../config/keys';
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POSTS = 'create_posts';
export const FETCH_POSTS2 = 'fetch_post';
export const DELETE_POSTS = 'delete_posts';
export const FETCH_MOVIES = 'fetch_posts';
export const FETCH_USER = 'fetch_user';

export function FetchUser() {
	return async function(dispatch) {
		const res = await axios.get('api/current_user');

		dispatch({
			type: FETCH_USER,
			payload: res,
		});
	};
}

export function handleStripeToken(token) {
	return async function(dispatch) {
		const res = await axios.post('api/stripe', token);

		dispatch({ type: FETCH_USER, payload: res.data });
	};
}

export function FetchMovies() {
	const req = axios.get(`${FETCH_URL}/posts${MOVIE_KEY}`);
	return {
		type: FETCH_MOVIES,
		payload: req,
	};
}

export function FetchPosts() {
	const req = axios.get(`${FETCH_URL}/posts${API_KEY}`);

	return {
		type: FETCH_POSTS,
		payload: req,
	};
}

export function CreatePosts(values, callback) {
	const req = axios.post(`${FETCH_URL}/posts${API_KEY}`, values).then(() => callback());

	return {
		type: CREATE_POSTS,
		payload: req,
	};
}

export function FetchPosts2(id) {
	const req = axios.get(`${FETCH_URL}/posts/${id}${API_KEY}`);

	return {
		type: FETCH_POSTS2,
		payload: req,
	};
}

export function deletePost(id, callback) {
	const req = axios.delete(`${FETCH_URL}/posts/${id}${API_KEY}`).then(() => callback());

	return {
		type: DELETE_POSTS,
		payload: id,
	};
}
