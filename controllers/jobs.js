const express = require('express');
const router = express.Router();
const Job = require('../models/jobs.js');
const Employer = require('../models/employers.js');

router.get('/', (req, res)=> {
  Job.find({}, (err, foundJobs)=> {
    res.render('jobs/index.ejs', {
      jobs:foundJobs
    });
  })
});

router.get('/new', (req,res)=>{
  Employer.find({}, (err, allEmployers)=> {
    res.render('jobs/new.ejs', {
      employers: allEmployers
    });
  });
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

router.get('/:id', (req, res)=> {
  Job.findById(req.params.id, (err, foundJob)=> {
    Employer.findOne({'jobs._id':req.params.id}, (err, foundEmployer)=> {
      res.render('jobs/show.ejs', {
        employer: foundEmployer,
        job: foundJob
      });
    })
  });
});

router.delete('/:id', (req,res)=> {
  Job.findByIdAndRemove(req.params.id, (err, foundJob)=> {
    Employer.findOne({'jobs._id':req.params.id}, (err, foundEmployer)=> {
      foundEmployer.jobs.id(req.params.id).remove();
      foundEmployer.save((err, data)=> {
        res.redirect('/jobs');
      });
    });
  });
});

router.get('/:id/edit', (req,res)=> {
  Job.findById(req.params.id, (err, foundJob)=> {
    Employer.find({}, (err, allEmployers)=>{
      Employer.findOne({'jobs._id':req.params.id}, (err, foundJobEmployer)=>{
        res.render('jobs/edit.ejs', {
          job:foundJob,
          employers: allEmployers,
          jobEmployer: foundJobEmployer
        });
      });
    });
  });
});


router.put('/:id', (req,res)=> {
  Job.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedJob)=> {
    Employer.findOne({'jobs._id': req.params.id}, (err, foundEmployer)=> {
      if (foundEmployer._id.toString() !== req.body.employerId){
        foundEmployer.jobs.id(req.params.id).remove();
        foundEmployer.save((err, savedFoundEmployer)=> {
          Employer.findById(req.body.employerId, (err, newEmployer)=>{
            newEmployer.jobs.push(updatedJob);
            newEmployer.save((err, savedNewEmployer)=> {
              res.redirect('/jobs/'+req.params.id);
            });
          });
        });
      } else {
        foundEmployer.jobs.id(req.params.id).remove();
        foundEmployer.jobs.push(updatedJob);
      foundEmployer.save((err, data)=> {
        res.redirect('/jobs/'+req.params.id);
      });
    }
    });
  });
});

module.exports = router;
