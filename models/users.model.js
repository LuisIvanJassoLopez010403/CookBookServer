const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,

    },
    profile_picture: {
        type: String,
    },
    created_recipes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipes"
    },
    created_lists: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lists"
    }
});

const usersModel = mongoose.model('Users', usersSchema);

module.exports = {
    usersModel
};