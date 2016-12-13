var express = require('express');
var router = express.Router();

var Text = require('../models/text'); 

//response json
router.get('/', function (req, res) {
	res.json({
		status: 'ok'
	});
});

router.post('/schema', function(req, res, next) {
	var codes = new Text({
		date: req.body.date,
		text: req.body.text
		//speed: req.body.speed

	});

	codes.save(function(err, data) {
		if (err) {
			console.log(err);
			res.status(500);
			return res.json({
				status: 'error',
				message: 'could not create code',
				error: err
			});
		}

		return res.json({
			status: 'ok',
			message: 'created new code',
			codes: data
		});
	});
});

router.get('/schema', function(req, res, next) {
	Text.find({}, function(err, data) {
		if (err) {
			res.status(500);
			return res.json({
				status: 'error',
				message: 'could not get texts'
			});
		}
		return res.json(data);
	});
});

module.exports = router;