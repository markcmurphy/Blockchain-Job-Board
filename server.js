const express = require('express');
const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard';
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
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

app.use(session({
  secret: "oldShoeFarm",
  resave: false,
  saveUninitialized: false
}));

app.listen(port, () => {
  console.log('I am listening...');
});

app.get('/', function(req, res){
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});

mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=> {
  console.log('connected to Mongo');
});
