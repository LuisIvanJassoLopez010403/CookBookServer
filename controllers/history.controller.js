const { historyModel } = require('../models/history.model');

// Crear una nueva entrada en el historial
async function createHistory(req, res) {
  const { idUser, idRecipe, action } = req.body;

  try {
    const newHistory = new historyModel({
      idUser,
      idRecipe,
      action
    });

    await newHistory.save();
    res.status(201).json({ message: 'Historial registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el historial' });
  }
};

// Obtener el historial de un usuario
async function getUserHistory(req, res) {
  const { userId } = req.params;

  try {
    const history = await historyModel.find({ idUser: userId }).populate('idRecipe');
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

// Servicio para mostrar el historial de recetas que ha visto el usuario (punto 7)
async function getUserViewedRecipes(req, res) {
  const { userId } = req.params;

  try {
    const viewedRecipes = await historyModel.find({       // Buscar las entradas del historial donde el usuario ha visto recetas (action = "VIEWED")
      idUser: userId,
      action: 'VIEWED'                                    // se filtra por la accion de visualizacion
    }).populate('idRecipe'); 
    
    // Enviar el historial de recetas vistas 
    res.status(200).json(viewedRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de recetas vistas' });
  }
};

module.exports = {
  createHistory,
  getUserHistory,
  getUserViewedRecipes 
};
