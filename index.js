const express         = require('express');
const mustacheExpress = require('mustache-express');
const data            = require('./data.js');
const app             = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res){
  res.render('index', { userData: data.users});

});

app.listen(3000, function(){
  console.log('App is running on localhost:3000');
});
