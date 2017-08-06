const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('employers/new.ejs');
});

router.get('/', (req, res)=> {
  res.render('employers/index.ejs');
});

module.exports = router;
