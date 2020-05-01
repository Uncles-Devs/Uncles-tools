const mongoose = require("mongoose");

const lRSchema = mongoose.Schema({
    serverId: String,
    level: Number,
    roleId: String
});

module.exports = mongoose.model('levelRoles', lRSchema)