const mongoose = require('mongoose');

var cubeSchema = require('mongoose').model('Cube').schema;

const Schema = mongoose.Schema;

const userSchema = new Schema({

/*   userid   : Number,
  username : String,  
  password : String
   */
  username : {
    type: String,
    required: true
    //required: true,
    //unique : true,
    //minlength: 4,
    //maxlength: 20
  },

  firstname : {
    type: String,
    //required: true
    //required: true,
    //unique : true,
    //minlength: 4,
    //maxlength: 20
  },

  lastname : {
    type: String,
    //required: true
    //required: true,
    //unique : true,
    //minlength: 4,
    //maxlength: 20
  },


  password : {
    type: String,
    required: true,
    //unique : true,
    //minlength: 4,
    //maxlength: 20
  },

  cube: [cubeSchema]

});

const User = mongoose.model('User', userSchema);

module.exports = User;

