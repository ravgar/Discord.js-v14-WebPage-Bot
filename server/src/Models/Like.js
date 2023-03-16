const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    userID: String,
    guildID: String,
    date: Number,
    likeCount: Number
});

module.exports = mongoose.model("like", schema);
