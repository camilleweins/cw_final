var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user');


module.exports = function(app, options) {
	return {
		//middleware
		init: function() {
			passport.use(new LocalStrategy(User.authenticate()));
			passport.serializeUser(function(user, done) {
				done(null, user._id);
			});
			passport.deserializeUser(function(id, done) {
				User.findById(id, function(err, user) {
					if (err || !user) return done(err, null);
					done(null, user);
				});
			});


			app.use(passport.initialize());
			app.use(passport.session());

			app.use(function(req, res, next) {
				//add user to res.locals
				res.locals.user = req.user;
				next();
			});
		},
		//routes
		registerRoutes: function() {
			// app.get('/signup', function(req, res) {
			// 	res.render('signup', {header: 'Sign Up'});
			// });

			app.post('/profile', function(req, res, next) {
				var newUser = new User ({
					username: req.body.username
				});
				User.register(newUser, req.body.password, function(err, user) {
					if (err) {
						console.log('signup error' + err);
						return res.render('signup', {
							flash: {
								type: 'negative',
								header: 'Signup Error',
								body: err.message
							},
							header: 'Sign Up'
						});
					}
					passport.authenticate('local')(req, res, function() {
						req.session.flash = {
							type: 'positive',
							header: 'Registration Success',
							body: 'Welcome, ' + user.username
						};
						res.redirect('/profile');
					});

				});
			});

			//flashback as custom callback
			// app.get('/profile', function(req, res) {
			// 	res.render('signup', {header: 'Log In'});
			// });

			app.post('/', passport.authenticate('local'), function(req, res) {
				console.log(req.user);
				req.session.flash = {
					type: 'positive',
					header: user.username + 'Signed in',
					body: "Logged in"

				};
				res.redirect('/profile');
			});

			app.get('/logout', function(req, res) {
				req.logout();
				req.session.resave;
				req.session.flash = {
					type: 'positive',
					header: 'Signed out',
					body: 'Successfully signed out'
				};
				res.redirect('/Welcome');
			});

		}
	}
};