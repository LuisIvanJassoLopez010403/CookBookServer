const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  nameList: {
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipe",
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

const listModel = mongoose.model('Lists', listSchema);

module.exports = {
    listModel
}