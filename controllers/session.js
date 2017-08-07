const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt  = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('users/login.ejs', {message: req.session.message || ''});
});

router.get('/register', (req, res) => {
  res.render('users/register.ejs', {})
})

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    // if (req.body.password == foundUser.password) {
      // if the user exists use the bcrypt compare passwords
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.message = '';
          req.session.username = req.body.username;
          req.session.logged = true;
          console.log(req.session);
          res.redirect('/employers');
        } else {
          // create a message for the user
          req.session.message = 'username or password are incorrect';
          res.redirect('/sessions/login')
        }
      } else {
        req.session.message = 'username or password are incorrect';
        res.redirect('/sessions/login')
      }
    });
  })


router.post('/register', (req, res) => {
   // hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // create on object for are db entry
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
    // set up session
    req.session.message  = '';
    req.session.username = user.username;
    req.session.logged   = true;
    res.redirect('/employers')
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      //do something
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;
