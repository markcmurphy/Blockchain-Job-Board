const express = require('express');
const router = express.Router();
const Job = require('../models/jobs.js');

router.get('/new', (req,res)=>{
  res.render('jobs/new.ejs');
});

router.get('/', (req, res)=> {
  Job.find({}, (err, foundJobs)=> {
  res.render('jobs/index.ejs', {
      jobs:foundJobs
    });
  })
});

router.post('/', (req,res)=>{
  Job.create(req.body, (err, createdJob)=>{
    res.redirect('/jobs');
  });
});

module.exports = router;
