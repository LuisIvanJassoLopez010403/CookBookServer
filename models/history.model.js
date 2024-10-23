const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  idUsers: {
    type: [mongoose.Types.ObjectId], 
    ref: "Users" 
  },
  idRecipe: {
    type: [mongoose.Types.ObjectId], 
    ref: "Recipes" 

  },
  date: {
    type: Number

  }

});

const historyModel = mongoose.model('History', historySchema);

module.exports = {
  historyModel
}



//Utilizar el GET TIme, las fechas se manejan mejor con number (investigar)