const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    nameIngredient: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const ingredientsModel = mongoose.model('Ingredients', ingredientsSchema);

module.exports = {
    ingredientsModel
};