var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
//const Accessory = require('../models/accessory');

/* GET Add Cube page. */
router.post('/:id',  async function(req, res, next) {

  let cube;
     try {
        cube = await Cube.findById(req.params.id);
        await cube.remove();
        res.redirect('/dashboard');
    }catch(err) {
        if(err) throw err;
            if (cube == null) {
                res.redirect('/dashboard');
            }else {
                res.redirect(`/details/${cube.id}`);
            }       
    }     
  
});

module.exports = router;
