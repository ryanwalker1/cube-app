const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

//var cubeSchema = require('mongoose').model('Cube').schema; 

const accessorySchema = new Schema({
  
  name: String,
  description: String,
  imageUrl: String,
  cubes: [{type: Schema.Types.ObjectId, ref: 'Cube'}]
})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;