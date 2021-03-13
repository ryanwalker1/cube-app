var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const e = require('express');
const { json } = require('express');
const passport = require('passport');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log('we are logining a user');
    res.render('login', { title: 'User Login'});    
  
});


//Login Handle
 router.post('/', (req, res, next) => {       
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }) (req, res, next);


  });

module.exports = router;
