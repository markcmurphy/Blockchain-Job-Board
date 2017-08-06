const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const employersController = require('./controllers/employers.js');
app.use ('/employers', employersController);

const jobsController = require('./controllers/jobs.js');
app.use('/jobs', jobsController);

app.listen(3000, () => {
  console.log('I am listening...');
});

app.get ('/', (req, res)=> {
  res.render('index.ejs');
});

mongoose.connect('mongodb://localhost:27017/jobboard');

mongoose.connection.once('open', ()=> {
  console.log('connected to Mongo');
});
