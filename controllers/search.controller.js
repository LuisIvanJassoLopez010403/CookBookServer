const { recipeModel } = require('../models/recipe.model'); 

async function searchRecipes(req, res) {
    try {
        const { ingredients, category } = req.body;

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ error: 'Debes proporcionar al menos un ingrediente.' });
        }

        const query = {
            'ingredients._idIngredient': { $in: ingredients.map(id => mongoose.Types.ObjectId(id)) }
        };

        if (category) {
            query['categoria'] = category;
        }

        const recipes = await recipeModel.find(query).populate('ingredients._idIngredient categoria');

        // Retornar las recetas encontradas
        res.status(200).json({ recipes });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

module.exports = { 
    searchRecipes
};