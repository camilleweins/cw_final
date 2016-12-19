var express = require('express');
var router = express.Router();

var T = require('../models/text'); //use the schema

router.get('/', function(req, res) {
	res.render('view');
});

router.get('/profile', function(req, res) {
	res.render('profile');
});

router.get('/gallery', function(req, res) {
	res.render('gallery');
});

router.get('/text', function(req, res) {
	res.render('sound');
});

router.get('/textsubmit', function(req, res) {
	res.render('text-submit');
});

router.post('/textsubmit', function(req, res) {
	console.log(req.body.text);
	var textSubmit = new T({
		dateCreated: req.body.date,
		text: req.body.text
	});
	textSubmit.save(function(err, data) {
		if (err) {
			return res.redirect(303, '/textsubmit');
		}
		res.redirect('/profile');
	});
});

module.exports = router;