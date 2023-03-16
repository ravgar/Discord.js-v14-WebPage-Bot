const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  guildName: String,
  guildID: String,
  categoryName: String,
  like: Number
});

module.exports = mongoose.model("datas", schema);