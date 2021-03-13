var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const User = require('../models/user')
const Accessory = require('../models/accessory')

const {ensureAuthenticated} = require('../config/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  Cube.find()
  
    .then((response) => {
     // console.log('all the cubes are ', response)

      if(req.user){
        res.render('index', { title: 'guest', cube: response, user:true });
      }else{
        res.render('index', { title: 'guest', cube: response, user:false });
      }
        
    })
  
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
   let cubeData;

   Cube.find({})
   .then(data =>{
      //console.log('this is all the cubes on current user ' + data);
      res.render('dashboard', {username:req.user.firstname, cube:data});   
   })
   
    
  
});

router.get('/create', ensureAuthenticated, (req, res) => {

  res.render('create', {name:req.user.firstname});    
 
});

router.get('/attach', ensureAuthenticated, (req, res) => {
  res.render('attachAccessory');  
});

router.get('/details', ensureAuthenticated, (req, res) => {

  res.render('updatedDetailsPage');    
 
});

module.exports = router;
