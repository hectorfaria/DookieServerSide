const keys = require('../src/config/keys');
const stripe = require('stripe')(keys.stripeSecretID);
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 100,
			currency: 'usd',
			description: '1 buck for 5 posts.',
			source: req.body.id,
		});

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
