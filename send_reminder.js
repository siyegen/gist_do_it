var dotenv = require('dotenv');
dotenv.load();

var sg_user    = process.env.SG_USER;
var sg_key     = process.env.SG_KEY;
var to_email   = process.env.TO_EMAIL;

var sendgrid   = require('sendgrid')(sg_user, sg_key);
var email      = new sendgrid.Email();

var gh_key = process.env.GH_KEY;
var current_todo = process.env.GH_GIST;

var reminder = require('./reminder.js')(gh_key);

reminder.getTodo(current_todo, function(error, content) {
  if (!error) {
    var sent_date = (new Date()).toLocaleString();
    var small_date = sent_date.split(" ").slice(0,4).join(" ");
    content = sent_date + "\n\n" + content;

    email.addTo(to_email);
    email.setFrom(to_email);
    email.setSubject('Did you do it yet? - ' + small_date);
    email.setText(content);
    email.addHeader({'X-Sent-Using': 'SendGrid-API'});
    email.addHeader({'X-Transport': 'web'});

    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });
  }
});

