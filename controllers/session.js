const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt  = require('bcrypt');
const flash = require('express-flash');


router.get('/login', (req, res) => {
  res.render('users/login.ejs', {
    currentUser: req.session.currentuser,
    message: req.session.message || ''});
});

router.get('/register', (req, res) => {
  res.render('users/register.ejs', {
    currentUser: req.session.currentuser
  });
})

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs',
  {currentUser: req.session.currentuser
  });
});

router.post('/login', (req, res) => {
 User.findOne({username: req.body.username}, (err, user) => {
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            req.session.username = req.body.username;
            req.session.currentuser = user;
            req.session.logged = true;
            console.log(req.session.currentuser);
            console.log(req.session.logged);
            req.flash('success', 'You are logged in!');
            res.redirect('/')
        } else {
          console.log('incorrect!');
          req.session.message = 'username or password are incorrect';
          res.redirect('/sessions/login')
        }
    } else {
          console.log('incorrect?');
          console.log(req.session.logged);
          req.session.message = 'username or password are incorrect';
          res.redirect('/sessions/login')
    }
 });
});


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
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;
