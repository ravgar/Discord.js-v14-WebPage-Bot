const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    guildID: String,
    rozet: Boolean,
    first: String,
    second: String
});

module.exports = mongoose.model("guilds",schema);