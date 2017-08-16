const express         = require('express');
const mustacheExpress = require('mustache-express');
const data            = require('./data.js');
const app             = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('public'))

app.get('/', function(req, res){
  res.render('directory', { userData: data.users});
});
app.get('/listing/:id', function(req, res){

  let singleUser = data.users.find(function(user){
    return user.id == req.params.id;
  });

  res.render('listing', { userData: singleUser});
});

app.listen(3000, function(){
  console.log('App is running on localhost:3000');
});
