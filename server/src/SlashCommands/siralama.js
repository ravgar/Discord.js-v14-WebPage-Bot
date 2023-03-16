const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const config = require("../config.json")
const Guild = require('../Models/Guild');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("odulsistemi")
        .setDescription("Ödül sistemi ayarlamanızı sağlar!")
        .addRoleOption((option) => option.setName("birincirol").setDescription("Verilmesini istediğiniz ikinci rol!").setRequired(true))
        .addRoleOption((option) => option.setName("ikincirol").setDescription("Verilmesini istediğiniz ikinci rol!").setRequired(true))
        .setDefaultMemberPermissions(8),

    run: async ({ interaction, client }) => {
        if (interaction.member.id !== interaction.guild.ownerId) return;

        const first = interaction.options.getRole("birincirol")
        const second = interaction.options.getRole("ikincirol")

        await Guild.updateOne({ guildID: interaction.guild.id }, { $set: { first: first.id } }, { upsert: true }).exec();
        await Guild.updateOne({ guildID: interaction.guild.id }, { $set: { second: second.id } }, { upsert: true }).exec();
        await Guild.updateOne({ guildID: interaction.guild.id }, { $set: { rozet: true } }, { upsert: true }).exec();

        interaction.reply({
            content: `
Tebrikler! Ödül sistemi başarılı bir şekilde ayarlandı! 

Genel bilgiler; 

Birinci ödül rolü : ${first}
İkinci ödül rolü : ${second}
            `, ephemeral: true
        })
    }
}