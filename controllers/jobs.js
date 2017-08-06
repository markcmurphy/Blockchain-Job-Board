const express = require('express');
const router = express.Router();
const Job = require('../models/jobs.js');
const Employer = require('../models/employers.js');

router.get('/new', (req,res)=>{
  Author.find({}, (err, allEmployers)=> {
    res.render('jobs/new.ejs', {
      employers: allEmployers
    });
  });
});

router.delete('/:id', (req,res)=> {
  Job.findByIdAndRemove(req.params.id, ()=> {
    res.redirect('/jobs');
  });
});

router.put('/:id', (req,res)=> {
  Job.findByIdAndUpdate(req.params.id, req.body, ()=> {
    res.redirect('/jobs');
  });
});

router.get('/:id/edit', (req,res)=> {
  Job.findById(req.params.id, (err, foundJob)=> {
     res.render('jobs/edit.ejs', {
       job:foundJob
     });
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
  Employer.findById(req.body.employerId, (err, foundEmployer)=>{
    Job.create(req.body, (err, createdJob)=>{
    foundEmployer.jobs.push(createdJob);
    foundEmployer.save((err, data)=>{
      res.redirect('/jobs');
      });
    });
  });
});

router.get('/:id', (req,res)=> {
  Job.findById(req.params.id, (err, foundjob)=> {
    Employer.findOne({'jobs.id':req.params.id}, (err, foundEmployer)=> {
      res.render('jobs/show.ejs', {
        employer:foundEmployer,
        job: foundJob
      });
    })
  });
});

module.exports = router;
