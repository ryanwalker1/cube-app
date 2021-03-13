var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

/* GET Add Cube page. */
router.get('/:id', function(req, res, next) {
  //Get info from Cube via ID then pass to form
    Cube.findOne({_id: req.params.id})
    .then(data =>{
      console.log('this is the cube name passed to edit form ' + data.name)
      res.render('editcube', { title: 'Edit Cube', cube: data, hardcode: 'will this work'});
    })

  
});

//update cube route
router.post('/:id', function(req, res, next) {



  let cubeUpdated = {};
  
    let updatedCube = {
    
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.imageUrl,
    level: req.body.difficultyLevel,
    };

    let query = {_id:req.params.id};
    
    Cube.update(query, updatedCube, function(err) {
      if(err){
        console.log(err);
        return;
      }else{

        req.flash('success_msg', 'Cube was successfully updated');
        res.redirect('/dashboard');
      }
    })
    

});
module.exports = router;
