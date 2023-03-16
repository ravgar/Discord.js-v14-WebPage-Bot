const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js")
const config = require("../config.json")
const category = require('../Function/Category');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("category")
        .setDescription("Bir sunucuyu onaylamanızı sağlar!")
        .addStringOption((option) => option.setName("id").setDescription("Onaylamak istediğiniz sunucu id'si!").setRequired(true))
        .addStringOption((option) => option.setName("category").setDescription("Hangi kategoriye almak istiyorsunuz? ").setRequired(true))
        .setDefaultMemberPermissions(8),

    run: async ({ interaction, client }) => {
        if (interaction.guild.id !== config.destek.sunucuId) return;
        if (!config.destek.rolId.some(x => interaction.member.roles.cache.has(x)) && !interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) return;

        const serverID = interaction.options.getString("id")
        const categoryName = interaction.options.getString("category")
        if (isNaN(serverID)) return interaction.reply({ content: `Lütfen geçerli bir sunucu id'si giriniz!`, ephemeral: true })
        if (!["Public", "Doğrulanmamış", "Sohbet", "Oyun"].includes(categoryName)) return interaction.reply({ content: `Lütfen geçerli bir kategori belirtin! [Public, Doğrulanmış, Sohbet, Oyun]`, ephemeral: true })
        category(serverID, categoryName);
        interaction.reply({
            content: `
\`[${serverID}]\` sunucusu başarılı bir şekilde **${categoryName}** kategorisinde onaylandı!
            `})

    }
}