var express = require('express');
var router = express.Router();
const { recipeModel } = require('../models/recipe.model');

async function createRecipe(req, res) {
    try{
        const {nameRecipe, ingredients, steps} = req.body
        const user = req.user
        if (!nameRecipe){
            return res.status(404).json({ message: 'La receta debe llevar un nombre' });
        } else if (!ingredients)  {
            return res.status(404).json({ message: 'Falta llenar el campo de ingredientes' });
        } else if (!steps){
            return res.status(404).json({message: 'No has establecido los pasos de tu receta'})
        }

        const newReceta = new recipeModel({
            nameRecipe,
            ingredients,
            steps,
            autor: user._id
        })

        await newReceta.save();
        res.status(200).json({ message: 'Receta creada exitosamente', receta: newReceta});
    }catch (error){
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function updateRecipe (req, res) {
    try {
        const updateRecipe = await recipeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updateRecipe) {
            return res.status(404).json({ message: 'Receta no Encontrada' });
        }
        res.status(200).json(updateRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteRecipe (req, res) {
    try {
        const deleterecipe = await recipeModel.findByIdAndDelete(req.params.id);
        if (!deleterecipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json({ message: 'Receta eliminada'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getRecipe (req, res) {
    try {
        const recipe = await recipeModel.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getAllRecipes(res) {
    try {
        const recipes = await recipeModel.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getAllRecipes
};