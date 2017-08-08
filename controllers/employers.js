const express = require('express');
const router = express.Router();
const Employer = require('../models/employers.js');
const Job = require('../models/jobs.js');

router.put('/:id', (req,res)=> {
  Employer.findByIdAndUpdate(req.params.id, req.body, ()=> {
    res.redirect('/employers');
  });
});


router.get('/:id/edit', (req,res)=> {
  if(req.session.logged){
Employer.findById(req.params.id,(err, foundEmployer)=>{
  res.render('employers/edit.ejs', {
    employer: foundEmployer
  })
})
} else {
    res.redirect('/');
  }
});

router.delete('/:id', (req,res)=> {
  Employer.findByIdAndRemove(req.params.id, (err, foundEmployer)=>{
    const jobIds = [];
    for (let i=0; i<foundEmployer.jobs.length; i++) {
      jobIds.push(foundEmployer.jobs[i]._id);
    }
    Job.remove(
      {
          _id: {
            $in: jobIds
          }
      },
      (err, data)=> {
        res.redirect('/employers');
      }
    );
  });
});

router.get('/new', (req, res) => {
  res.render('employers/new.ejs');
});

router.get('/', (req, res)=> {
  Employer.find({}, (err, foundEmployers)=> {
    res.render('employers/index.ejs', {
      employers:foundEmployers
    });
  })
});

router.post('/login', (req, res) => {
  req.session.username = req.body.username;
  req.session.logged   = true;
  console.log(req.session);
  res.redirect('/employers')
});

router.post('/', (req, res)=> {
  Employer.create(req.body, (err, createdEmployer)=>{
    res.redirect('/employers');
  });
});



router.get('/:id', (req,res)=> {
  Employer.findById(req.params.id, (err, foundEmployer)=> {
    res.render('employers/show.ejs',{
      employer:foundEmployer
    });
  });
});

module.exports = router;
