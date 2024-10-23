const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  recipes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }, 
  recetaDefault: {
    type: Boolean, 
    default: false
  }
});

const listModel = mongoose.model('Lists', listSchema);

module.exports = {
    listModel
}