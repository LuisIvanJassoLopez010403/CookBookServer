const { historyModel } = require('../models/history.model');

async function getHistory(req, res) {
    const idrecipe = req.body.idrecipe;
    const iduser = req.user.id;

    try {
        let userHistory = await historyModel.findOne({ userId: iduser });
        
        if (!userHistory) {
            userHistory = new historyModel({
                userId: iduser,
                recipeHistory: [{ recipeId: idrecipe }]  
            });
        } else {
            userHistory.recipeHistory.push({
                recipeId: idrecipe,
                date: Date.now()
            });
        }

        await userHistory.save();
        res.status(201).json({ message: 'Receta agregada al historial', history: userHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la receta', error: error.message });
    }
};

async function viewHistory(req, res) {
    const iduser = req.body.id;

    try {
        const history = await historyModel.aggregate([
            { $match: { userId: iduser } },
            { $unwind: "$recipeHistory" },
            { 
                $lookup: { 
                    from: "recipes", 
                    localField: "recipeHistory.recipeId",
                    foreignField: "_id",
                    as: "recipeHistory.recipeId"
                }
            },
            { $sort: { "recipeHistory.date": -1 } },
            { $group: { 
                _id: "$_id",
                userId: { $first: "$userId" },
                recipeHistory: { $push: "$recipeHistory" },
                __v: { $first: "$__v" }
            }}
        ]);
        

        if (!history || history.length === 0) {
            console.log('User ID:', iduser);
            return res.status(404).json({ message: 'No se encontró historial para este usuario.' });
        }

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial', error: error.message });
    }
}


module.exports = {
    getHistory,
    viewHistory
}
  