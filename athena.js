//TODO: Create templates
//TODO: Create stylesheet
const express = require('express');
const marked = require('marked');
const app = express();

let port = 8080; //TODO: Specify port in config file

app.get('/', function(req, res) {
  res.send(marked('Hello, Marked!'));
  //TODO: Generate listing of last (x) posts
})

app.get('/update', function(req, res) {

})

app.listen(port, function() {
  console.log('We\'re live on port ' + port);
})
