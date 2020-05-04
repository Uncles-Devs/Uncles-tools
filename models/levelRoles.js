const mongoose = require("mongoose");

const cpSchema = mongoose.Schema({
    serverId: String,
    level: Number,
    roles: Array
});

module.exports = mongoose.model('lr', cpSchema)