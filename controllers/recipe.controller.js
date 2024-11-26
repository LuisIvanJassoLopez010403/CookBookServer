const { recipeModel } = require('../models/recipe.model');
const { historyModel } = require('../models/history.model');
const mongoose = require('mongoose');

async function createRecipe(req, res) {
    try {
        const { nameRecipe, description, preptime, ingredients, steps, createdDate, category, autor, image, video } = req.body;

        if (!nameRecipe) {
            return res.status(400).json({ message: 'La receta debe llevar un nombre' });
        }
        if (!description) {
            return res.status(400).json({ message: 'La receta debe de llevar una descripcion' });
        }
        if (!preptime) {
            return res.status(400).json({ message: 'La receta debe de llevar tiempo de preparacion' });
        }
        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Falta llenar el campo de ingredientes' });
        }
        if (!steps) {
            return res.status(400).json({ message: 'No has establecido los pasos de tu receta' });
        }
        if (!preptime) {
            return res.status(400).json({ message: 'La receta debe de llevar tiempo de preparacion' });
        }
        if (!category) {
            return res.status(400).json({ message: 'No se ha agregado la categoria' });
        }
        if (!createdDate) {
            return res.status(400).json({ message: 'La receta debe de llevar fecha' });
        }
        if (!autor) {
            return res.status(400).json({ message: 'La receta debe de llevar autor' });
        }
        

        const newReceta = new recipeModel({
            nameRecipe,
            description,
            preptime,
            ingredients,  
            steps,
            createdDate,
            category: new mongoose.Types.ObjectId(category),
            autor: new mongoose.Types.ObjectId(autor),
            image,
            video 
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
        res.status(500).json({ message: 'Error del Servidor', details: error.message });
    }
};

async function getRecipe(req, res) {
    const userId = req.body.userId;  
    const recipeId = req.body.id;  

    try {
        const recipe = await recipeModel.findById(recipeId).populate('ingredients._idIngredient category autor');
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        let currentHistory = await historyModel.findOne({ userId: userId });
        if (!currentHistory) {
            
            currentHistory = new historyModel({
                userId: userId,  
                recipeHistory: [{
                    recipeId: recipeId,  
                    date: Date.now()
                }]
            });
            await currentHistory.save();
        } else {
           
            const recipeInHistory = currentHistory.recipeHistory.find(item => item.recipeId.toString() === recipeId);
            if (!recipeInHistory) {
                
                currentHistory.recipeHistory.push({
                    recipeId: recipeId,
                    date: Date.now()
                });
                await currentHistory.save();
            } else {
                recipeInHistory.date = Date.now();
                await currentHistory.save();
            }
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error del Servidor', details: error.message });
    }
};

async function getAllRecipes(req, res) {
    try {
        const recipes = await recipeModel.find().populate('ingredients._idIngredient category autor');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', details: error.message });
    }
};

const getAllRecipesByCategory = async (req, res) => {
    try{
        const ingredients = await recipeModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails' // Asegura que cada receta tenga un objeto de categoría
            },
            {
                $group: {
                    _id: '$categoryDetails.category',
                    recipes: {
                        $push: {
                            _id: '$_id',
                            nameRecipe: '$nameRecipe',
                            description: '$description',
                            preptime: '$preptime',
                            ingredients: '$ingredients',
                            steps: '$steps',
                            createdDate: '$createdDate',
                            category: '$category',
                            autor: '$autor',
                            image: '$image',
                            video: '$video'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$category',
                    recipes: 1
                }
            },
            {
                $sort: { category: 1 }
            }
        ])

        res.status(200).json(ingredients);
    }
    catch (error) {
        res.status(500).json({ message: 'Error del servidor', details: error.message });
    }
};

async function getRecipesByUser(req, res) {
    try {
        const { userId } = req.body;

        const recipes = await recipeModel.find({ autor: userId });
        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron recetas para este usuario.' });
        }

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.', details: error.message });
    }
}

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getAllRecipes,
    getAllRecipesByCategory,
    getRecipesByUser
};
