const express = require('express');
const router = express.Router();
const User = require('../models/robots')
const mongoose = require('mongoose')
const passport = require('passport')

let results = [];

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
      res.render('results', {userData: users})
    })
    .catch(function(err) {
      console.log('errors: ', err)
    })
})
router.get('/employed', function(req, res) {
  User.find({'job': {$ne:null}})
    .then(function(users) {
      res.render('results', {userData: users})
    })
    .catch(function(err) {
      console.log('errors: ', err)
    })
})
router.get('/available', function(req, res) {
  User.find({'job': null})
    .then(function(users) {
      res.render('results', {userData: users})
    })
    .catch(function(err) {
      console.log('errors: ', err)
    })
})

router.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/")
})

function getOne(req, res, next) {
  User.findOne({username: req.params.username})
  .then(function(data) {
    res.render('listing', data)
    next()
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
}

router.get('/view/:username', getOne, function(req, res) {})

module.exports = router;
