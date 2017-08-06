const mongoose = require('mongoose');
const employerSchema = mongoose.Schema({
  name: String
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
