const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    Categoria: {
        type: String,
        required: true
    }
});

const CategoriaModel = mongoose.model('Categoria', categoriaSchema);

module.exports = {
    CategoriaModel
}