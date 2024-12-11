const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema({
    _idIngredient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredients',
        required: true
    },
    unit: {
        type: String,
        required: true
    }, 
    amount:{
        type: Number,
        required: true
    }
});

const recipeSchema = new mongoose.Schema({
    nameRecipe: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    preptime: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [IngredientsSchema],
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required: true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    grade: {
        type: Number
    }
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    recipeModel
}