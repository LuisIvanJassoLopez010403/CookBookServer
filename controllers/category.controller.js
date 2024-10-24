const {
    categoryModel
} = require('../models/categorys.model'); 

async function createCategory(req, res) {
    try {
        const category = req.body.category;

        if (!category) {
            return res.status(400).json({ message: 'La categoría debe llevar un nombre' });
        }

        const newCategory = new categoryModel({
            category
        });

        await newCategory.save();
        res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.', details: error.message});
    }
}

async function updateCategory(req, res) {
    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            req.body.id,  
            req.body,       
            { new: true }   
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(req.body.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}