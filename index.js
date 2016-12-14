// load modules
var express = require('express');
var hbs = require('express-handlebars');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); //needs to know about the session
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// load .env
require('dotenv').config();

// create app
var app = express();

var PORT = process.env.PORT || 8081;

// init handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//gets value of form fields from req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



mongoose.connect(process.env.DB_URL);

var options = {};

app.use(session({
	secret: process.env.cookieSecret,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7 //one day
	},
	resave: true, //keep only if you want to keep last visit
	saveUninitialized: true, //for every site visitor
	store: new MongoStore({
		url: process.env.DB_URL,
		update: MongoStore.update
	})
}));

//attach req.session.flash to res.locals (local variable)
app.use(function(req, res, next) {

	res.locals.flash = req.session.flash; //transfer to the local variable to render on page
	delete req.session.flash;
	next();
});

//req as a function and pass app as a parameter
var auth = require('./lib/auth')(app, options);
auth.init(); //setup middleware related to authentication
auth.registerRoutes();

//home page
// app.get('/text', function(req, res) {
// 	return res.render('view', {
// 		//msg: 'You have a treat: ' + req.signedCookies.treat
// 		msg: 'Submit some text'
// 	});
// });

//
// app.get('/profile', function(req, res) {
// 	res.render('profile', {
// 		msg: 'You have a treat: ' + req.session.treat
// 	});
// });

// app.get('/treat', function(req, res) {

// 	res.render('treat', {
// 		msg: 'Pick a treat'
// 	})
// })

// app.post('/treat', function(req, res) {
// 	console.log(req.session.treat);
// 	req.session.treat = treat[Math.floor(Math.random() * treat.length)];
// 	req.session.flash = {
// 		type: 'positive', 
// 		header: 'You got a treat (check your profile)',
// 		body: 'The treat is ' + req.session.treat
// 	};
// 	res.redirect('/');
// });

// app.post('/submit', function(req, res) {
// 	var textSubmit = new T({
// 		dateCreated: req.body.date,
// 		text: text
// 	})
// 	req.session.flash = {
// 		type: 'positive',
// 		header: 'Thank you!'
// 	};
// });

// app.get('/clear', function(req, res) {
// 	delete req.session.treat;
// 	req.session.flash = {
// 		type: 'negative', 
// 		header: 'No treat',
// 		body: 'The bag is empty'
// 	};
// 	res.redirect('/');
// });
var api = require('./routes/api');
app.use('/api', api);

var T = require('./routes/text');
app.use('/', T);
// start server
app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});