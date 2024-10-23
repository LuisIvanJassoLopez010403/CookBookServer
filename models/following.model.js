const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    idFollower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

const followingModel = mongoose.model('Following', usersSchema);

module.exports = {
    followingModel
};