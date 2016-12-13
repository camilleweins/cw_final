var express = require('express');
var router = express.Router();

var T = require('../models/text'); //use the schema

router.get('/', function(req, res) {
	res.render('welcome');
});

// router.get('/welcome', function(req, res) {
// 	res.render('welcome');
// });

// router.get('/signup', function(req, res) {
// 	res.render('signup');
// });

// router.get('/play', function(req, res) {
// 	res.render('text-submit');
// });
// router.get('/play', function(req, res) {
// 	res.render('profile');
// });

router.post('/play', function(req, res) {
	console.log(req.text);
	var textSubmit = new T({
		dateCreated: req.body.date,
		text: req.body.text
	});
	textSubmit.save(function(err, data) {
		if (err) {
			return res.redirect(303, '/play');
		}
		res.redirect('/profile');
	});
});

module.exports = router;