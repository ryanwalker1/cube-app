var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory')
const Cube = require('../models/cube');
const User = require('../models/user');


/* GET users listing. */
 router.get('/:id',  async function(req, res, next) {
  let isOwner = false;
  let currentUserID = '';
  let qryUserID = '';


  currentUserID = JSON.stringify(req.user._id);
  let id = req.params.id;
   
 await User.findOne({'cube._id': id})
  .then(data =>{

    qryUserID = JSON.stringify(data._id);
    if(currentUserID === qryUserID){
      isOwner = true;
     
    }else{
      isOwner = false;
    } 

    Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
           res.render('updatedDetailsPage', {cube: results, accessories: results.accessories, name:req.user.firstname, owner:isOwner})

    });    
 
  })

  

});

module.exports = router;
