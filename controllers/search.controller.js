const { recipeModel } = require('../models/recipe.model');
const mongoose = require('mongoose');

async function searchSpecifiedRecipes(req, res) {
    try {
        const { ingredients, category, nameRecipe } = req.body;
        let query = {};

        if (!ingredients && !category && !nameRecipe) {
            return res.status(400).json({ error: 'Debe enviar al menos un criterio de búsqueda.' });
        }

        if (ingredients && ingredients.length > 0) {
            query['ingredients._idIngredient'] = { $all: ingredients.map(id => new mongoose.Types.ObjectId(id)) };
        }

        if (category && category.length > 0) {
            query['category'] = { $all: category.map(id => new mongoose.Types.ObjectId(id)) };
        }

        if (nameRecipe) {
            query['nameRecipe'] = { $regex: nameRecipe, $options: 'i'};
        }

        const recipes = await recipeModel.find(query).populate('ingredients._idIngredient category');

        res.status(200).json({ recipes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function searchRecipes(req, res) {
    try {
        const { ingredients, category, nameRecipe } = req.body;
        let query = {};

        if (!ingredients && !category && !nameRecipe) {
            return res.status(400).json({ error: 'Debe enviar al menos un criterio de búsqueda.' });
        }

        if (ingredients && ingredients.length > 0) {
            query['ingredients._idIngredient'] = { $in: ingredients.map(id => new mongoose.Types.ObjectId(id)) };
        }

        if (category) {
            query['category'] = { $in: ingredients.map(id = new mongoose.Types.ObjectId(id)) };
        }

        if (nameRecipe) {
            query['nameRecipe'] = { $regex: nameRecipe, $options: 'i'};
        }

        const recipes = await recipeModel.find(query).populate('ingredients._idIngredient category');

        res.status(200).json({ recipes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

module.exports = { 
    searchRecipes,
    searchSpecifiedRecipes
};