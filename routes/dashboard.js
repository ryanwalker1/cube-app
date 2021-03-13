var express = require('express');
var router = express.Router();
//const Cube = require('../models/cube');
//const User = require('../models/user');
//const Cube = require('../models/cube');


/* GET home page. */
router.get('/', function(req, res, next) {

  console.log('the user I am looking for and id is ');
  User.findOne({_id:req.user._id})
    .then(results =>{
      console.log('results of query ' + results);
    })


  res.render('dashboard', { title: 'Welcome user' });
});

module.exports = router;
