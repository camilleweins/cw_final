var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema ({
	accuracy: Number,
	characters_left: Number,
	message: String,
	fonts: String,
	characters: String
});

module.exports = mongoose.model('Score', Score); 
//export model called 'User' with User schema 