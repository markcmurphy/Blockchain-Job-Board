const express = require('express');
const router = express.Router();
const Employer = require(../models/employers.js);

router.get('/new', (req, res) => {
  res.render('employers/new.ejs');
});

router.get('/', (req, res)=> {
  res.render('employers/index.ejs');
});

router.post('/', (req, res)=> {
  Employer.create(req.body, (err, createdEmployer)=>{
    res.redirect('/employers');
  });
});

module.exports = router;
