var express = require('express');
var dotenv = require('dotenv');
dotenv.load();

var app   = express();
var port  = process.env.PORT;

// Index route, display logged in, otherwise sign up page
app.get('/', function(req, res) {
  res.send('Hello World');
});

// Oauth confirm page, show when GH redirects back
app.get('/GH_confirm_email', function(req, res) {
  res.send('GH Done, sent confirmation email');
});

// Email confirm page
app.get('/email_confirmed', function(req, res) {
  res.send('Email done, here is an example!');
});

// Example usage
app.get('/usage', function(req, res) {
  res.send('Email done, here is an example!');
});

// Redirect everything else
app.get('*', function(req, res) {
  res.send('not here');
});

app.listen(port);
console.log("Starting on port", port);
