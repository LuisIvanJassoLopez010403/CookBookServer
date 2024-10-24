const {
    historyModel
} = require('../models/history.model');
const {
    recipeModel
} = require('../models/recipe.model');

async function getHistory(req, res) {
    const idrecipe = req.body.idrecipe;
    const iduser = req.user.id;

    try{
        const newHistory = new historyModel({
            idrecipe,
            iduser
        });
        await newHistory.save();
        res.status(201).json({ message: 'Receta agregada al historial', history: newHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la receta', error: error.message });
    }
};