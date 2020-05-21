const mongoose = require("mongoose");

const cpSchema = mongoose.Schema({
    serverId: String,
    level: Number,
    roles: Array,
    roleName: String
});

module.exports = mongoose.model('rewards', cpSchema)