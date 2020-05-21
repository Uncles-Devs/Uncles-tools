const mongoose = require("mongoose");

const cpSchema = mongoose.Schema({
    username: String,
    userId: String,
    serverId: String,
    xp: Number,
    totalXp: Number,
    level: Number
});

module.exports = mongoose.model('leveling', cpSchema)