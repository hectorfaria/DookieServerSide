import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { FetchUser } from './actions';

const App = ({ route }) => {
	return (
		<div>
			<Header />
			{renderRoutes(route.routes)}
		</div>
	);
};

function loadData(store) {
	return store.dispatch(FetchUser());
}

export default {
	loadData,
	component: App,
};
