const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Job = require('./jobs.js');

const userSchema = Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
