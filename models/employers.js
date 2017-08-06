const mongoose = require('mongoose');
const Job = require('./jobs.js');
const employerSchema = mongoose.Schema({
  name: String,
  jobs: [Job.schema]
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
