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
    type: String,

  },
  recipes: {
    type: [mongoose.Types.ObjectId], 
        ref: "Historial"                    //Cambiar ref a recetas
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