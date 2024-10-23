const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Types.ObjectId, //Un solo usua
    ref: "Users", 
    required: true
  },
  idRecipe: {
    type: mongoose.Types.ObjectId, // Una sola receta
    ref: "Recipe", 
    required: true
  },
  date: {
    type: Number, // Timestamp para almacenar la fecha
    default: Date.now // Almacenar la fecha actual como valor por defecto
  }
});

const historyModel = mongoose.model('History', historySchema);

module.exports = {
  historyModel
}




//Utilizar el GET TIme, las fechas se manejan mejor con number (investigar)
