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

router.get('/', requireLogin, function(req, res) {
  User.find({}).sort('name')
    .then(function(users) {
      res.render('results', {userData: users})
    })
    .catch(function(err) {
      console.log('errors: ', err)
    })
})
router.get('/employed', requireLogin, function(req, res) {
  User.find({'job': {$ne:null}})
    .then(function(users) {
      res.render('results', {userData: users})
    })
    .catch(function(err) {
      console.log('errors: ', err)
    })
})
router.get('/available', requireLogin, function(req, res) {
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
    if (req.user.username === req.params.username) {
      data.match = true;
      console.log('data: ', data);
      res.render('my_profile', data)
    } else {
      res.render('profile', data)
      next()
    }
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
}

router.get('/view/:username', requireLogin, getOne, function(req, res) {})

router.get('/edit/:username', requireLogin, function(req, res) {
  User.findOne({username: req.params.username})
  .then(function(data) {
    res.render('edit', data)
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
})

router.post('/update/:username', function(req, res) {

  let skills = req.body.skills.split(" ");

  User.findOne({username: req.params.username})
  .then(function(data) {

    data.name = req.body.name
    data.avatar = req.body.avatar
    data.job = req.body.job
    data.company = req.body.company
    data.skills = skills
    data.phone = req.body.phone
    data.address.street_num = req.body.street_num
    data.address.street_name = req.body.street_name
    data.address.city = req.body.city
    data.address.state_or_province = req.body.state_or_province
    data.address.postal_code = req.body.postal_code
    data.address.country = req.body.country

    data.save(function(err) {
      if (err) {
        console.log('Error saving: ', err)
      }
    })
  })
  .catch(function(err) {
    console.log('Error finding: ', err);
  })
  // User.updateOne({username: req.params.username}, {
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password,
  //     name: req.body.name,
  //     avatar: req.body.avatar,
  //     job: req.body.job,
  //     company: req.body.company,
  //     skills: req.body.skills,
  //     phone: req.body.phone,
  //     street_num: req.body.street_num,
  //     street_name: req.body.street_name,
  //     city: req.body.city,
  //     state_or_province: req.body.state_or_province,
  //     postal_code: req.body.postal_code,
  //     country: req.body.country
  //   },
  //   {
  //     upsert: true
  //   }
  // )
  res.redirect('/')
})

module.exports = router;
