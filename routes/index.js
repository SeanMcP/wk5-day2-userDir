const express = require('express');
const router = express.Router();
const User = require('../models/robots')
const mongoose = require('mongoose')
const passport = require('passport')

let data = [];

const getListings = function(req, res, next) {
  User.find({}).sort('name')
    .then(function(users) {
      data = users
      next()
    })
    .catch(function(err) {
      console.log('errors', errors);
    })
}

const requireLogin = function(req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/login')
  }
}

function getAll(req, res, next) {
  User.find()
  .then(function(data) {
    results = data
    next()
  })
  .catch(function(err) {
    console.log(err);
  })
}

function getOne(req, res, next) {
  let id = req.params.id
  User.find({_id: id})
  .then(function(data) {
    results = data
    next()
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
}

// router.get('/', requireLogin, function(req, res) {
//   res.render('results',
//
//   // {
//   //   message: res.locals.getMessages()
//   // })
// })

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  })
  .then(function(data) {
    res.redirect('/');
  })
  .catch(function(err) {
    console.log('Sign up error: ', err);
    res.redirect('/signup')
  })
})

router.get('/', function(req, res) {
  User.find({}).sort('name')
    .then(function(users) {
      res.render('results', { userData: users})
    })
    .catch(function(err) {
      console.log('errors', errors)
    })
})
router.get('/employed', function(req, res) {
  User.find({'job': {$ne:null}})
    .then(function(users) {
      res.render('results', { userData: users})
    })
    .catch(function(err) {
      console.log('errors', errors)
    })
})
router.get('/available', function(req, res) {
  User.find({'job': null})
    .then(function(users) {
      res.render('results', { userData: users})
    })
    .catch(function(err) {
      console.log('errors', errors)
    })
})
// router.get('/listing/:id', getListings, function(req, res){
//   let singleUser = data.find(function(user){
//     return user.id == req.params.id;
//   });
//   res.render('listing', singleUser);
// });
//
// router.get('/available', getAvailable, function(req, res) {
//   res.render('results', { userData: data});
// })
//
// router.get('/employed', getEmployed, function(req, res) {
//   res.render('results', { userData: data});
// })
//
// router.get('/skill/:skill', getBySkill, function(req, res) {
//   res.render('results', { userData: data});
// })
//
// router.get('/country/:country', getByCountry, function(req, res) {
//   res.render('results', { userData: data});
// })

module.exports = router;
