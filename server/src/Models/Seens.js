const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    userID: String,
    guildID: String,
    lastSeen: Number,


    lastSeenVoice: Number,
    newChannelId: String,
    oldChannelId: String,

    lastSeenMessage: Number,
    messageChannelId: String,
    messageContent: String,

    lastType: String,
    lastContent: Array,

    lastNames: Array,
    lastName: String,
});

module.exports = mongoose.model("seens", schema);