const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const config = require("../config.json")
const hatirlat = require('../Models/Hatirlat');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("hatirlatici")
        .setDescription("Like atma zamanınızı hatırlatır!")
        .setDefaultMemberPermissions(8),
    run: async ({ interaction, client }) => {

        const hatirlatici = await hatirlat.findOne({ guildID: interaction.guild.id });

        if (hatirlatici.hatirlat == true) {
            await hatirlat.updateOne({ guildID: interaction.guild.id }, { $set: { hatirlat: false } }, { upsert: true }).exec();
            interaction.reply({
                content: `
Merhaba! Başarılı şekilde hatırlatıcınızı aktif hale getirdim! Like atma süreniz geldiğinde mesaj kutunuz açık ise dm üzerinden değil ise bu sunucuda herhangi bir kanaldan bilgilendirileceksiniz!
                `})
        } else {
            await hatirlat.updateOne({ guildID: interaction.guild.id }, { $set: { hatirlat: true } }, { upsert: true }).exec();
            interaction.reply({
                content: `
Merhaba! Başarılı şekilde hatırlatıcınızı kapalı hale getirdim!
                `})
        }




    }
}