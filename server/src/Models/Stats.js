const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    topVoice: Number,
    topMessage: Number,
});

module.exports = mongoose.model("stats", schema);