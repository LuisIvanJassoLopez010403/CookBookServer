const { recipeModel } = require('../models/recipe.model');
const { historyModel } = require('../models/history.model');

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
            autor,
            category
        });

        await newReceta.save();
        res.status(201).json({ message: 'Receta creada exitosamente', receta: newReceta });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.', details: error.message});
    }
};

async function updateRecipe(req, res) {
    try {
        const updatedRecipe = await recipeModel.findByIdAndUpdate(
            req.body.id,  
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
        const deletedRecipe = await recipeModel.findByIdAndDelete(req.body.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json({ message: 'Receta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error del Servidor', details: error.message });
    }
};

async function getRecipe(req, res) {
    const userid = req.user.id;

    try {
        const recipe = await recipeModel.findById(req.body.id).populate('ingredients._idIngredient category autor');
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        let currentHistory = await historyModel.findOne({ userId });
        if (!currentHistory) {
            currentHistory = new historyModel({
                userid,
                recetaId,
                fechaVista: Date.now()
            });
            await currentHistory.save();
        } else {
            const recipehistory = await historyModel.findOne({recetaId });
            if (!recipehistory) {
                const newhistory = new historyModel({
                    userId,
                    recetaId
                });
                await newhistory.save();
            } else {
                recipehistory.date = Date.now();
                await recipehistory.save();
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

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getAllRecipes
};
