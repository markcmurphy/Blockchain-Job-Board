const express = require('express');
const router = express.Router();
const Employer = require('../models/employers.js');

router.delete('/:id', (req,res)=> {
  Employer.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/employers');
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
