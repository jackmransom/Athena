//TODO: Create stylesheet
const express = require('express');
const marked = require('marked');
const fs = require('fs');
const app = express();

let port = process.env.PORT || 8080; //TODO: Specify port in config file

app.use(express.static('public'));

function getListOfArticles(year) {
  let filePath = 'posts/' + year;
  //TODO: Use async functions
  let articles = fs.readdirSync(filePath)
  return articles;
}

function getFirstParagraph(year, article) {
  let path = 'posts/' + year + '/' + article
  let file = fs.readFileSync(path, encoding='utf8');
  return file;
}

app.get('/', function(req, res) {
  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth();

  //TODO: Generate listing of last (x) posts, grab the title and first paragraph for each
  //TODO: Decide on templating engine
  let header = fs.readFileSync('templates/header.html', encoding='utf8');
  var body = "";

  getListOfArticles(current_year).forEach(function(article) {
    let preview = getFirstParagraph(current_year, article);
    body = body.concat(marked(preview));
    
  });
  
  let footer = fs.readFileSync('templates/footer.html', encoding='utf8');
  res.send(header+body+footer);
})

app.get('/update', function(req, res) {
  //TODO: Remove this?
})


app.listen(port, function() {
  console.log('We\'re live on port ' + port);
})

