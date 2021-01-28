var express = require('express');
var router = express.Router();
let cubes = require('../config/database.json');
const Cube = require('../models/cube');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  Cube.findOne({_id: req.params.id})
    .then((response) => {
      console.log('Cube to attach accessory to ', response)
      res.render('attachAccessory', { title: 'Attach Accessory', cube: response });
    })
  
});


module.exports = router;
