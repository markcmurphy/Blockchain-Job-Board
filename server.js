const express = require('express');
const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard';
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cheerio = require('cheerio');
const request = require('request');
request('http://careerportal.thetechtank.com/#/jobs/289', function(err, res, body){
  console.log(err);
  if(!err && res.statusCode === 200){
    console.log('worked');
    var $ = cheerio.load(body);
    $('.card-title ng-binding').each(function(){
        console.log($(this).text());
        console.log($(this).attr('href'));
        console.log("----------");
      });
    }
  }
);

const session = require('express-session');
app.use(session({
  secret: "oldShoeFarm",
  resave: false,
  saveUninitialized: false
}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/session.js');
app.use('/sessions', sessionsController);




const employersController = require('./controllers/employers.js');
app.use ('/employers', employersController);

const jobsController = require('./controllers/jobs.js');
app.use('/jobs', jobsController);


app.get('/app', function(req, res){
    if(req.session.currentuser){
        res.send('the party');
    } else {
        res.redirect('/sessions/new');
    }
});


app.get('/', (req, res) => {
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});


mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=> {
  console.log('connected to Mongo');
});

app.listen(port, () => {
  console.log('I am listening...');
});
