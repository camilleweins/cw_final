var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textSchema = new Schema ({
	text: String,
	date: {type: Date, default: Date.now}
});

var Text = mongoose.model('Text', textSchema);

module.exports =  Text
//export model called 'User' with User schema 