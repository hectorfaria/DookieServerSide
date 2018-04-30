import React from 'react';
import App from './App';
import Home from './pages/Home';
import DonatePage from './pages/DonatePage';
import NewPost from './pages/posts/NewPost';
import PostShow from './pages/posts/ShowPost';
import ListPosts from './pages/posts/ListPost';
import Chat from './components/Chat';
import NotFound from './pages/NotFound';

export default [
	{
		...App,
		routes: [
			{
				...Home,
				path: '/',
				exact: true,
			},
			{
				path: '/donate',
				...DonatePage,
			},
			{
				path: '/chat',
				...Chat,
			},
			{
				path: '/posts/new',
				...NewPost,
			},
			{
				path: '/posts/:id',
				...PostShow,
			},
			{
				path: '/posts',
				...ListPosts,
			},

			{
				...NotFound,
			},
		],
	},
];
