const { listModel } = require('../models/lists.model');

async function createList(req, res) {
    try {
        const { nameList, image, description, recipes } = req.body;

        if (!nameList) {
            return res.status(400).json({ message: 'El nombre de la lista es obligatorio' });
        }
        if (!recipes || recipes.length === 0) {
            return res.status(400).json({ message: 'Debe incluir al menos una receta en la lista' });
        }

        const newList = new listModel({
            nameList,
            image,
            description,
            recipes
        });

        await newList.save();
        res.status(201).json({ message: 'Lista creada con éxito', list: newList });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lista', error: error.message });
    }
}

async function getAllLists(req, res) {
    try {
        const lists = await listModel.find().populate('recipes'); 
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las listas', error: error.message });
    }
}

async function getListById(req, res) {
    try {
        const { id } = req.body;
        const list = await listModel.findById(id).populate('recipes');

        if (!list) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista', error: error.message });
    }
}

async function updateList(req, res) {
    try {
        const { id } = req.body;
        const { nameList, image, description, recipes } = req.body;

        if (!nameList) {
            return res.status(400).json({ message: 'El nombre de la lista es obligatorio' });
        }
        if (!recipes || recipes.length === 0) {
            return res.status(400).json({ message: 'Debe incluir al menos una receta en la lista' });
        }

        const updatedList = await listModel.findByIdAndUpdate(
            id, 
            { nameList, image, description, recipes }, 
            { new: true }
        ).populate('recipes');

        if (!updatedList) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }

        res.status(200).json({ message: 'Lista actualizada con éxito', list: updatedList });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la lista', error: error.message });
    }
}

// Eliminar una lista
async function deleteList(req, res) {
    try {
        const { id } = req.body;

        const deletedList = await listModel.findByIdAndDelete(id);

        if (!deletedList) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }

        res.status(200).json({ message: 'Lista eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la lista', error: error.message });
    }
}

module.exports = {
    createList,
    getAllLists,
    getListById,
    updateList,
    deleteList
};