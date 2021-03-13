var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const User = require('../models/user');
const app = require('../app');
const app2 = express();
const uuid = require('uuid');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

//-------------------------------------------------
const { json } = require('express');
const passport = require('passport');
//-------------------------------------------------

/* GET home page. */
router.get('/register', function(req, res, next) {

    res.render('register', { title: 'USER REGISTRATION'});  

    console.log('we are here');
  
});


// here  we add a user

/* router.get('/register', function(req, res, next) {
    console.log('Registering a User');
    res.render('register', { title: 'Add Users'})
  });
   */
  router.post('/register', async function(req, res, next) {
    //console.log("the registration form is ", req.body)

    let errors = [];

    console.log( `I'm registering a user ` + req.body.username + req.body.password + req.body.password2) ;
    
    
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    const myPlaintextPassword = req.body.password;
    let password = req.body.password;
    let password2 = req.body.password2;
    //let userid = uuid.v4();
    let userid = Math.floor(Math.random() * 1001);

    
    if(!username || !password || !password2){
        errors.push({msg: 'Please complete the form'});   
        res.render('register', {errors:errors});
        return
    }

      //check if user already exists
      await User.findOne({username: username}, function(err, userObj){
        if(userObj){
            errors.push({msg: "Username is taken"});
            res.render('register', {errors:errors});
            return
        }            
                 
    });

    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
        res.render('register', {errors:errors});
        return
    }

    if(password.length < 6){
        errors.push({msg: 'Passwords should be at least 6 characters'});
        res.render('register', {errors:errors});
        return
    }

  

    if(errors.length > 0){
        
        res.render('register', {errors: errors});  
       
    }else{

        // Auto Generate Hash password
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

            if(err){
                    console.log(err);
            }else{

                    //add new user to database
                    const newUser = new User({
                    
                    userid : userid,
                    username:username,
                    firstname:firstname,
                    lastname:lastname,
                    //email: req.body.email,
                    password: hash
            
                    });
                    newUser.save()
                    .then((user) => { 
                        req.flash('success_msg', 'You are now Registered');
                       // console.log('the new user is ', res)
                        res.redirect('/users/login');
                    
                    })
                    .catch(err => console.log(err));                    
            }
        
        });


    }
   
  });


  //User login Route
  /* GET home page. */
router.get('/login', function(req, res, next) {


    //console.log('we are logining a user');
    res.render('login', { title: 'User Login'});    
  
});


//Login Handle
 router.post('/login', (req, res, next) => {

    //let errors = [];
    
    //console.log( `I'm logging a user ` + req.body.username + ' ' + req.body.password) ;   
    
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }) (req, res, next);


  });

  //Handle Logout
  router.get('/logout', (req,res) => {
      req.logout();
      req.flash('success_msg', 'You are successfully logged out');
      res.redirect('/users/login');
  })


module.exports = router;
