const mongoose = require("mongoose");

const cpSchema = mongoose.Schema({
    username: String,
    userId: String,
    serverId: String,
    xp: Number,
    level: Number
});

module.exports = mongoose.model('Levels', cpSchema)