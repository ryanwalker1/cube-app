var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const { response } = require('express');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  let cubeData;
  let accessoryData;

  Accessory.find({})
  .then((AccResponse) =>{
    accessoryData = AccResponse;

   // console.log('This is my accessory data ' +  accessoryData);
   //list all the accessories not listed on the cube
  })

 Cube.findOne({_id: req.params.id}).populate('accessories')   
  .then((cubeResponse) => {
    //console.log('this is the cube id ' + req.params.id);
    cubeData = cubeResponse;
      //console.log('accessory data for currnt cube', cubeData.accessories);
      res.render('attachAccessory', { title: 'Attach New Accessory', cube: cubeData, accessory: accessoryData, name:req.user.firstname});
    })  
});


router.post('/:id', function(req, res, next) {
  
  /* const newAcc = {
    
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.imageUrl,
    
  }; */

  Cube.findOneAndUpdate({_id: req.params.id}, { $addToSet: { accessories: [req.body.accessory]}}, function(err, res2) {
    if (err) {
      res2.send(err);
    } else {   
    
      //console.log(res)
    }
  })


   Accessory.findOneAndUpdate({_id: req.body.accessory}, { $addToSet: { cubes: [req.params.id]}}, function(err, res2) {
    console.log('this is the accessory id found ' + req.body.accessory );
    console.log('this is the cube Id found ' + req.params.id );

    if (err) {
      res2.send(err);
      //console.log(err);
    } else {
      res.redirect('/dashboard');
    }
  }) 

  

});

module.exports = router;
