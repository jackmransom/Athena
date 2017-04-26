//TODO: Create stylesheet
const express = require('express');
const marked = require('marked');
const fs = require('fs');
const app = express();
const hljs = require('highlight.js')
const handlebars = require('handlebars')

const port = process.env.PORT || 8080; //TODO: Specify port in config file?
const postsDir = 'posts/'
const header = fs.readFileSync('templates/header.html', encoding='utf8');
const footer = fs.readFileSync('templates/footer.html', encoding='utf8');

marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(lang, code).value
  }
})

app.use(express.static('public'));


app.get('/', function(req, res) {
  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth();

  var body = "";
  getListOfArticles(current_year).forEach(function(article) {
    let preview = getArticle(current_year, article);
    body = body.concat(marked(preview) + '<hr>');
    
  });
  res.send(header+body+footer);
})

app.get('/about', function(req, res) {
  let path = postsDir + 'about.md'
  let file = fs.readFileSync(path, encoding='utf8')
  res.send(header+marked(file)+footer)
})

app.get('/:year/:postName', function(req, res) {
  let path = postsDir + req.params['year'] + '/' + req.params['postName'] + '.md'
  let post = fs.readFileSync(path, encoding='utf8')
  var template = handlebars.compile(header)
  var context = {Foo: 'Foop', bar:'Baaaar'}
  
  res.send(template(context)+marked(post)+footer)
})

app.listen(port, function() {
  console.log('We\'re live on port ' + port);
})

function getListOfArticles(year) {
  let filePath = postsDir + year;
  //TODO: Use async functions
  let articles = fs.readdirSync(filePath);
  return articles;
}

function getArticle(year, article) {
  let path = postsDir + year + '/' + article
  let file = fs.readFileSync(path, encoding='utf8');
  return file
}
