const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  cubes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }]

})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;



// module.exports = mongoose => {
//   var schema = mongoose.Schema(
//     {
//       title: String,
//       description: String,
//       published: Boolean
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Tutorial = mongoose.model("tutorial", schema);
//   return Tutorial;
// };


// // class cubeSchema {
// //   constructor(id, name, description, imgUrl, level) {
// //     this.id = id;
// //     this.name = name;
// //     this.description = description;
// //     this.imgUrl = imgUrl;
// //     this.level = level;
// //   }
// // }