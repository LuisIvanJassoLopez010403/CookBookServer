const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    categoria: {
        type: String,
        required: true
    }
});

const categoryModel = mongoose.model('Category', categoriaSchema);

module.exports = {
    categoryModel
}