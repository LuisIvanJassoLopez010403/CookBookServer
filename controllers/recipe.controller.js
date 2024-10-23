var express = require('express');
var router = express.Router();
const {
    RecipeModel
} = require('../models/recipe.model');

async function createRecipe(req, res) {
    const nameRecipe = req.body.nameRacipe;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;

    try{
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

        const newRecipe = new RecipeModel({
            newRecipe: newRecipe,
            ingredients: ingredients,
            steps: steps
        });
        await newRecipe.save();
        return res.status(201).json(newRecipe);
    }catch (error){
        return res.status(500).json('Error al crear la receta', error);
    }
}

async function Editar(req, res) {
    const editrecipe = await RecipeModel.findById(id_receta);

    try {
        if (!id_receta) {
            return res.status(500).json('Error al Encontrar la Receta', error);
        }

        const editrecipe = await RecipeModel.findById(id_receta);
        const recipes = await RecipeModel.find();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json('Error al obtener las recetas', error);
    }
}