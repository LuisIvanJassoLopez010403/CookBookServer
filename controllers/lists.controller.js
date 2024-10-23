const mongoose = require('mongoose');

// Crear un nuevo listado (POST /lists)
const createList = async (req, res) => {

    try {
        const { name, image, description, recipes } = req.body;

        // Crear un nuevo listado
        const newList = new listModel({
            name,
            image,
            description,
            recipes
            
        });

        // Guardar el listado en la base de datos  (Estatus 200 confirmado y 500 error)
        await newList.save();
        res.status(201).json({ message: 'Listado creado con éxito', list: newList });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el listado', error });
    }
};

// Obtener todos los listados (GET /lists)
const getAllLists = async (req, res) => {
    try {
        const lists = await listModel.find();
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los listados', error });
    }
};

// Obtener un listado por ID (GET /lists/:id)
const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await listModel.findById(id);

        if (!list) {
            return res.status(404).json({ message: 'Listado no encontrado' });
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el listado', error });
    }
};

// Actualizar un listado 
const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, description, recipes} = req.body;

        const updatedList = await listModel.findByIdAndUpdate(id, {
            name,
            image,
            description,
            recipes
            
        }, { new: true });

        if (!updatedList) {
            return res.status(404).json({ message: 'Listado no encontrado' });
        }

        res.status(200).json({ message: 'Listado actualizado con éxito', list: updatedList });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el listado', error });
    }
};

// Eliminar un listado (DELETE /lists/:id) 
const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedList = await listModel.findByIdAndDelete(id);

        if (!deletedList) {
            return res.status(404).json({ message: 'Listado no encontrado' });
        }

        res.status(200).json({ message: 'Listado eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el listado', error });
    }
};

module.exports = {
    createList,
    getAllLists,
    getListById,
    updateList,
    deleteList
};