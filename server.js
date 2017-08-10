const express = require('express');
const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard';
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('express-flash');
app.use(methodOverride('_method'));
const Job = require('./models/jobs.js');
const GeoJSON = require('geojson');
const ellipsize = require('ellipsize');



// const cheerio = require('cheerio');
// const request = require('request');
// request('http://careerportal.thetechtank.com/#/jobs/289', function(err, res, body){
//   console.log(err);
//   if(!err && res.statusCode === 200){
//     console.log('worked');
//     var $ = cheerio.load(body);
//     $('.card-title ng-binding').each(function(){
//         console.log($(this).text());
//         console.log($(this).attr('href'));
//         console.log("----------");
//       });
//     }
//   }
// );

app.use(express.static('public'));

app.locals.GeoJSON = GeoJSON;
app.locals.ellipsize = ellipsize;

const session = require('express-session');
app.use(session({
  secret: "oldShoeFarm",
  resave: false,
  saveUninitialized: false
}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(flash());

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/session.js');
app.use('/sessions', sessionsController);

const employersController = require('./controllers/employers.js');
app.use ('/employers', employersController);

const jobsController = require('./controllers/jobs.js');
app.use('/jobs', jobsController);

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});

app.get('/', (req, res) => {
  Job.find({}, 'lat lng -_id', function(err, foundJob) {
   const jobcoords = [];
    for (let i=0; i< foundJob.length; i++) {
    jobcoords.push(foundJob[i]);
    }
    res.render('index.ejs', {
    currentUser: req.session.currentuser,
    jobcoords: jobcoords
});
})
})




// jobs.forEach(function(user) {
//   jobslist[Job.coordinates] = jobs;
// });
//
// res.send(jobslist);
// });
// });

// app.all('/', function(req, res){
//   req.flash('test', 'it worked');
//   res.redirect('/test')
// });
//
// app.all('/test', function(req, res){
//   res.send(JSON.stringify(req.flash('test')));
// });

mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=> {
  console.log('connected to Mongo');
});

app.listen(port, () => {
  console.log('I am listening...');
});
