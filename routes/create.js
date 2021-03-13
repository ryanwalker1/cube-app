var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const User = require('../models/user');

/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  //console.log('add a cube')
  res.render('create', { title: 'Create a Cube ' });
});

router.post('/', function(req, res, next) {
    const newCube = new Cube({
    
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.imageUrl,
      level: req.body.difficultyLevel,
    });
   
    User.findOneAndUpdate({_id: req.user._id}, { $addToSet: { cube: [newCube]}}, function(err, res2) {
      //console.log('in update user. logged in user is '+ req.user._id);
      if (err) {
        res2.send(err);
        //console.log(err);
      } else {
        //res.redirect('/');
      }
    })   
    
    newCube.save()
    .then((result) => {
        res.redirect('/dashboard');
      })
      .catch((err) => {
        res.send(err)
      })

});

router.get('/accessory', function(req, res, next) {
  //console.log('Create accessory');
  res.render('createAccessory', { title: 'Add Accessory', name:req.user.firstname})
});

router.post('/accessory', function(req, res, next) {
  //console.log("the accessory form is ", req.body)
  const newAcc = new Accessory({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  })
  newAcc.save()
    .then((data) => {
      
      res.redirect('/dashboard');
            
      })
})


module.exports = router;
