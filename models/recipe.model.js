const mongoose = require('mongoose');
const {
    CategoriaModel
} = require('./categorias.model');

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
    preptime: {
        type: String,
        required: true
    },
    ingredients: {
        type: [IngredientsSchema],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String
    },
    categoria: {
        type: CategoriaModel,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required: true
    },
    Calificacion: {
        type: Number,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    }
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    RecipeModel
}