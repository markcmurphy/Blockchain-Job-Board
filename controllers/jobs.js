const express = require('express');
const router = express.Router();

router.get('/new', (req,res)=>{
  res.render('jobs/new.ejs');
});

router.get('/', (req, res)=> {
  res.render('jobs/index.ejs')
});

module.exports = router;
