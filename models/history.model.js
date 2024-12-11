const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Types.ObjectId, 
    ref: "Users",
    required: true
  },
  recipeHistory: [{
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]

});

const historyModel = mongoose.model('History', historySchema);

module.exports = {
  historyModel
}

