const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  İnvite: String,
  guildID: Number,
});
module.exports = mongoose.model("GuildInvite", schema);