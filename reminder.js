// Stored todo in a gist, go grab it!
var request = require('request');

var Reminder = function(gh_token) {
  if( !(this instanceof Reminder) ) {
    return new Reminder(gh_token);
  }

  var options = {
    url: 'https://api.github.com/gists/',
    auth: {
      user: gh_token,
      pass: 'x-oauth-basic'
    },
    headers: {'User-Agent': 'Remind-me'}
  };

  var getTodo = function(gist, cb) {
    this.options.url = this.options.url + gist;

    request(this.options, function handleGist(error, response, body) {
      if (!error && response.statusCode == 200) {
        var gist = JSON.parse(body);
        var content = gist.files.remind_todo.content;
        console.log(content);
        // TODO: Why the hell do I have to do two breaks to get them
        // to show up in gmail?
        return cb(null, content.replace(/\n/g,"\n\n"));
      } else {
        console.error("Couldn't get gist", response);
        return cb(new Error(error), null);
      }
    });
  };

  this.getTodo = getTodo;
  this.options = options;
  this.gh_token = gh_token;
  return this;
};


module.exports = Reminder;
