const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = {
    categoryModel
}