const express = require('express');
const router = express.Router();

let data = [];

const getListings = function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient; // Bring in the Mongo client
  let assert = require('assert'); // Tests for errors

  let url = 'mongodb://localhost:27017/users'; // Mongo runs on separate localhost

  MongoClient.connect(url, function(err, db){ // db represents robot user database
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();
    });
    // looking:   users.find({'job': null})
    // employed:  users.find({'job': $not: null})
  });
  let getData = function(db, callback) {
    let users = db.collection('users');

    users.find({}).toArray().then(function(users) {
        data = users;
        callback();
    });
  }
}

router.get('/', getListings, function(req, res) {
  res.render('directory', { userData: data});
});
router.get('/listing/:id', getListings, function(req, res){
  let singleUser = data.find(function(user){
    return user.id == req.params.id;
  });
  res.render('listing', singleUser);
});

module.exports = router;
