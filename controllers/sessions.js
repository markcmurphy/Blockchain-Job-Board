const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', function(req, res){
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
            res.send('logged in');
        } else {
            res.send('wrong password');
        }
    });
});

module.exports = router;
