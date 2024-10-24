const { recipeModel } = require('../models/recipe.model');
const { historyModel } = require('../models/history.model');
const mongoose = require('mongoose');

async function createRecipe(req, res) {
    try {
        const { nameRecipe, preptime, ingredients, steps, autor, category } = req.body;

        if (!nameRecipe) {
            return res.status(400).json({ message: 'La receta debe llevar un nombre' });
        }
        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Falta llenar el campo de ingredientes' });
        }
        if (!steps || steps.length === 0) {
            return res.status(400).json({ message: 'No has establecido los pasos de tu receta' });
        }
        if (!category) {
            return res.status(400).json({ message: 'No se ha agregado la categoria' });
        }

        const newReceta = new recipeModel({
            nameRecipe,
            preptime,
            ingredients,  
            steps, 
            autor: new mongoose.Types.ObjectId(autor),  // Convertir a ObjectId
            category: new mongoose.Types.ObjectId(category) // Convertir a ObjectId
        });

        await newReceta.save();
        res.status(201).json({ message: 'Receta creada exitosamente', receta: newReceta });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.', details: error.message });
    }
};

async function updateRecipe(req, res) {
    try {
        const { id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de receta inválido' });
        }

        const updatedRecipe = await recipeModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteRecipe(req, res) {
    try {
        const { id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de receta inválido' });
        }

        const deletedRecipe = await recipeModel.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        res.status(200).json({ message: 'Receta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getRecipe(req, res) {
    const userId = req.body.userId;  // ID enviado en el cuerpo de la solicitud
    const recipeId = req.body.id;  // ID de la receta que se está consultando

    try {
        const recipe = await recipeModel.findById(recipeId).populate('ingredients._idIngredient category autor');
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        let currentHistory = await historyModel.findOne({ idUsers: userId });
        if (!currentHistory) {
            // Si el historial para el usuario no existe, crea un nuevo historial
            currentHistory = new historyModel({
                idUsers: userId,  // Asegúrate de guardar el ID del usuario correctamente
                idRecipe: [{
                    recipeId: recipeId,  // Guarda el ID de la receta consultada
                    date: Date.now()
                }]
            });
            await currentHistory.save();
        } else {
            // Si ya existe un historial para el usuario, verifica si la receta ya está en el historial
            const recipeInHistory = currentHistory.idRecipe.find(item => item.recipeId.toString() === recipeId);
            if (!recipeInHistory) {
                // Si la receta no está en el historial, agrégala
                currentHistory.idRecipe.push({
                    recipeId: recipeId,
                    date: Date.now()
                });
                await currentHistory.save();
            } else {
                // Si ya está, actualiza la fecha de visualización
                recipeInHistory.date = Date.now();
                await currentHistory.save();
            }
        }
        
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



async function getAllRecipes(req, res) {
    try {
        const recipes = await recipeModel.find().populate('ingredients._idIngredient category autor');
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
