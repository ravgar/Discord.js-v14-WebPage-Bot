const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    guildID: String,
    hatirlat: Boolean,
});
module.exports = mongoose.model("Hatirlatici", schema);