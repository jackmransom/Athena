//TODO: Create templates
//TODO: Create stylesheet
const express = require('express');
const marked = require('marked');
const app = express();
const fs = require('fs');

let port = 8080; //TODO: Specify port in config file

function getListOfArticles(year) {
  let filePath = 'posts/' + year;
  //TODO: Use async functions
  let articles = fs.readdirSync(filePath)
  return articles;
}

app.get('/', function(req, res) {
  let current_date = new Date();
  let current_year = current_date.getFullYear();

  //TODO: Generate listing of last (x) posts
  let articles = getListOfArticles(current_year);

  //TODO: Decide on templating engine
  let header = fs.readFileSync('templates/header.html', encoding='utf8');
  let foo = fs.readFileSync('posts/about.md', encoding='utf8'); //TODO: Async
  let footer = fs.readFileSync('templates/footer.html', encoding='utf8');
  res.send(header+marked(foo)+footer);
})

app.get('/update', function(req, res) {

})

app.listen(port, function() {
  console.log('We\'re live on port ' + port);
})
