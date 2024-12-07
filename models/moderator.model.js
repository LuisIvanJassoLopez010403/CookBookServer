const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema({
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
        required: false
    },
    birthdate: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    bio: {
        type: String
    },
    profile_picture: {
        type: String
    },
    created_recipes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipes"
    },
    created_lists: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lists"
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

const moderatorsModel = mongoose.model('Moderator', moderatorSchema);

module.exports = {
    moderatorsModel
};