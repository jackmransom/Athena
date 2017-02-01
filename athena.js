var express = require('express')
var app = express()

var port = 8080

app.get('/', function(req, res) {
  res.send('Hello, World!')
})

app.get('/update', function(req, res) {
})

app.listen(port, function() {
  console.log('We\'re live on port ' + port) 
})
