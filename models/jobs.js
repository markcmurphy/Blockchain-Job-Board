const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: String,
  body: String,
  lat: Number,
  lng: Number
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
