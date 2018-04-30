const Pusher = require('pusher');
const keys = require('../src/config/keys');
module.exports = (app) => {
	const pusher = new Pusher({
		appId: keys.appIdPusher,
		key: keys.keyPusher,
		secret: keys.secretPusher,
		cluster: 'us2',
		encrypted: true,
	});

	app.post('/api/message', (req, res) => {
		const payload = req.body;
		pusher.trigger('chat', 'message', payload);
		res.send(payload);
	});
};
