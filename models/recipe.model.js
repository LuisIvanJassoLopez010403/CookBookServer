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
        required: false
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
        required: false
    },
    video: {
        type: String,
        required: false
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required: true
    },
    Calificacion: {
        type: Number,
        required: false
    },
    Fecha: {
        type: Date,
        required: false
    }
});
//se agrega comentario prueba para subir cambios
const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    recipeModel
}