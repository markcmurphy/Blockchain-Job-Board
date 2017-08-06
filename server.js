const express = require('express');
const app = express();
const mongoose = require('mongoose');

const employersController = require('./controllers/employers.js');
app.use ('/employers', employersController);

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
