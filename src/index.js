import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';
import { matchRoutes } from 'react-router-config';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import keys from './config/keys';
import bodyParser from 'body-parser';
import Pusher from 'pusher';
import cors from 'cors';
const app = express();

require('../models//mongouser');
require('../services/passport');

mongoose.connect(keys.MONGO_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.COOKIE_KEY ],
	}),
);

app.use(passport.initialize());
app.use(passport.session());

require('../routes/authRoutes')(app);
require('../routes/billingRoutes')(app);
require('../routes/chatRoutes')(app);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
	const store = createStore(req);

	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) => {
			return route.loadData ? route.loadData(store) : null;
		})
		.map((promise) => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		}); // return an array of req's

	Promise.all(promises).then(() => {
		const context = {};

		const content = renderer(req, store, context);
		if (context.url) {
			return res.redirect(301, context.url);
		}

		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
	});
});

app.listen(PORT, () => {
	console.log('Port: ' + PORT);
});
