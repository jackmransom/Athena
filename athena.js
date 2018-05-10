//TODO: Create stylesheet
const express = require('express');
const marked = require('marked');
const fs = require('fs');
const app = express();
const hljs = require('highlight.js');
const handlebars = require('handlebars') //TODO: Default tags

const port = process.env.PORT || 8080; //TODO: Specify port in config file?
const siteName = 'Fancy name tktk'
const postsDir = 'posts/';
const header = handlebars.compile(fs.readFileSync('templates/header.html', encoding='utf8'));
const footer = fs.readFileSync('templates/footer.html', encoding='utf8');


app.use(express.static('public'));

marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(lang, code).value
  }
})

app.get('/', function(req, res) {
  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth();

  var context = {title: 'Home', siteName: siteName, description: 'Welcome!'};

  var body = "";
  getListOfArticles(current_year).forEach(function(article) {
    let preview = getArticle(current_year, article);
    body = body.concat(marked(preview) + '<hr>');
    
  });
  res.send(header(context)+body+footer);
})

app.get('/about', function(req, res) {
  let path = postsDir + 'about.md';
  let file = fs.readFileSync(path, encoding='utf8');
  var context = {title: 'Home', siteName: siteName, description: 'Welcome!'};
  res.send(header(context)+marked(file)+footer);
})

app.get('/:year/:postName', function(req, res) {
  var name = req.params['postName'] + '.md'; //TODO: This is hacky
  var post = getArticle(req.params['year'], name);
  var context = {title: 'Wagwan', siteName: siteName,
		 description:'This is a clear placeholder.'};
  
  res.send(header(context)+marked(post)+footer);
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
  let path = postsDir + year + '/' + article;
  let file = fs.readFileSync(path, encoding='utf8');
  return file;
}

function getMetadata(markdown) {
  //TODO: Grab metadata from markdown file, strip it, and return both
}
