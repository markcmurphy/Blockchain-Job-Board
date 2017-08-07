const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
app.use(session({
  secret: "old shoe farm",
  resave: false,
  saveUninitialized: false
}));
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
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
