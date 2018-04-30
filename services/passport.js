const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../src/config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleSecretID,
			callbackURL: '/api/auth/google/callback',
		},
		async (acesstoken, refreshToken, profile, done) => {
			const existUser = await User.findOne({ googleId: profile.id });
			if (existUser) {
				return done(null, existUser);
			}
			const user = await new User({ googleId: profile.id, userName: profile.displayName }).save();
			done(null, user);
		},
	),
);
