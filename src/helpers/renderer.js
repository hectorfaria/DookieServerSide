import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

export default (req, store, context) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.path} context={context}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>,
	);

	const helmet = Helmet.renderStatic();

	return `<html>
	<head>
	${helmet.title.toString()}
	${helmet.meta.toString()}
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#000000">
	<meta
					property="og:description"
					content="Dookie is a page where you can watch videos with your friends share with them, every sunday we display different movies in Norwegian!"
				/>
				<meta property="og:site_name" content="Dookie" />
	<meta property="og:image" content="https://i.imgur.com/Ll3BaXB.png" />
	<link href="https://fonts.googleapis.com/css?family=Pacifico|Quicksand" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
	<link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/48938155eb24b4ccdde09426066869504c6dab3c/dist/css/bootstrap.min.css">
	</head>
		
		<body>
			<div id="root">${content}</div>
			<script>
				window.INITIAL_STATE = ${serialize(store.getState())}
			</script>
			<script src="bundle.js"></script>
		</body>
	</html>`;
};
