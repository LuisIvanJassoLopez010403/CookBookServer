var express = require('express');
var router = express.Router();
const {
    RecipeModel
} = require('../models/recipe.model');

async function createRecipe(req, res) {
    const nameRecipe = req.body.nameRacipe;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;

    if(!nameRecipe <= 0){
        return res.status(400).json({
            error: 'El nombre de la receta es obligatorio'
        });
    }else if (!ingredients <= 0){
        return res.status(400).json({
            error: 'Los ingredientes son obligatorios'
        });
    }else if (!steps <= 0){
        return res.status(400).json({
            error: 'Los pasos son obligatorios'
        });
    }

    try{
        const newRecipe = new RecipeModel({
            NameRecipe: NameRecipe,
            ingredients: ingredients,
            steps: steps
        });

        const recipe = await newRecipe.save();
        return res.status(201).json(recipe);
    }catch (error){
        return res.status(500).json({
            error: 'Error al crear la receta'
        });
    }
}