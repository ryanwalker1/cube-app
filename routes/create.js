var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a cube')
  res.render('create', { title: 'Create a Cube ' });
});

router.post('/', function(req, res, next) {
  console.log("incoming form submission " , req.body);

    const newCube = new Cube({
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.imageUrl,
    level: req.body.difficultyLevel,
    });
    
    newCube.save()
    .then((result) => {
      console.log(result)
      res.send(result)
      })
      .catch((err) => {
        res.send(err)
      })

})
module.exports = router;
