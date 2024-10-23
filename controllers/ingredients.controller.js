const { ingredientsModel } = require('../models/ingredients.model');

async function createIngredient(req, res) {
    try {
        const { nameIngredient, category } = req.body;

        if (!nameIngredient || !category) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }
        
        const existingIngredient = await ingredientsModel.findOne({ nameIngredient });
        if (existingIngredient) {
            return res.status(400).json({ error: 'El ingrediente ya existe.' });
        }

        const newIngredient = new ingredientsModel({
            nameIngredient,
            category
        });

        await newIngredient.save();

        res.status(201).json({ message: 'Ingrediente creado exitosamente.', ingredientId: newIngredient._id });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

// Obtener todos los ingredientes
const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientsModel.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un ingrediente por ID
async function getIngredientById(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el ID es válido y si el ingrediente existe
        const ingredient = await ingredientsModel.findById(id);
        if (!ingredient) {
            return res.status(404).json({ error: 'Ingrediente no encontrado.' });
        }

        res.status(200).json({ ingredient });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}


// Actualizar un ingrediente
async function updateIngredient(req, res) {
    try {
        const { id } = req.params;
        const { nameIngredient, category } = req.body;

        if (!nameIngredient || !category) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }

        const existingIngredient = await ingredientsModel.findById(id);
        if (!existingIngredient) {
            return res.status(404).json({ error: 'Ingrediente no encontrado.' });
        }

        const existingName = await ingredientsModel.findOne({ nameIngredient });
        if (existingName) {
            return res.status(400).json({ error: 'El ingrediente ya existe.' });
        }

        existingIngredient.nameIngredient = nameIngredient;
        existingIngredient.category = category;

        await existingIngredient.save();

        res.status(200).json({ message: 'Ingrediente actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function deleteIngredient(req, res) {
    try {
        const { id } = req.params;

        const ingredient = await ingredientsModel.findByIdAndDelete(id);

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingrediente no encontrado.' });
        }

        res.status(200).json({ message: 'Ingrediente eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}



module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};
