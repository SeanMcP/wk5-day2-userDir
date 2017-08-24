const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/robotDir')

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  passwordHash: { type: String, required: true },
  avatarUrl: String,
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  university: String,
  job: String,
  company: String,
  skills: [String],
  phone: Number,
  address: {
    street_num: Number,
    street_name: String,
    city: String,
    state_or_province: String,
    postal_code: Number,
    country: String
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
