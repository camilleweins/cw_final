// load modules
var express = require('express');
var hbs = require('express-handlebars');

// load .env
require('dotenv').config();

// create app
var app = express();
var PORT = process.env.PORT || 8081;

// init handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// home page
app.get('/', function(req, res) {
  return res.render('view', {
    msg: 'hello'
  });
});


// start server
app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});