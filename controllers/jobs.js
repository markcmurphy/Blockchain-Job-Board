const express = require('express');
const router = express.Router();
const Job = require('../models/jobs.js');

router.get('/new', (req,res)=>{
  res.render('jobs/new.ejs');
});

router.delete('/:id', (req,res)=> {
  Job.findByIdAndRemove(req.params.id, ()=> {
    res.redirect('/jobs');
  });
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

router.get('/:id', (req,res)=> {
  Job.findById(req.params.id, (err, foundjob)=> {
    res.render('jobs/show.ejs', {
      job: foundjob
    });
  });
});

module.exports = router;
