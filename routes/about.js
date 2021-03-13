var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.user){
      res.render('about', { title: 'Cubicle', user:true});
    }else{
      res.render('about', { title: 'Cubicle', user:false });
    }
  
});

module.exports = router;
