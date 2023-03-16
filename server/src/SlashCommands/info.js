const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const config = require("../config.json")
const database = require('../Models/Server');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Bir sunucu hakkında bilgi almanızı sağlar!")
        .addStringOption((option) => option.setName("id").setDescription("Bilgi almak istediğiniz sunucu idsi!").setRequired(true))
        .setDefaultMemberPermissions(8),

    run: async ({ interaction, client }) => {
        if (interaction.guild.id !== config.destek.sunucuId) return;
        if (!config.destek.rolId.some(x => interaction.member.roles.cache.has(x)) && !interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) return;

        const serverID = interaction.options.getString("id")
        if (isNaN(serverID)) return interaction.reply({ content: `Lütfen geçerli bir sunucu id'si giriniz!`, ephemeral: true })
        var server = client.guilds.cache.get(serverID);
        if (!server) return interaction.reply({ content: `Bu sunucuyu bulamıyorum!`, ephemeral: true });
        var category = await database.findOne({ guildID: server.id });


        interaction.reply({
            embeds: [new EmbedBuilder()
                .setTitle(`${server.name} | Sunucu bilgileri!`)
                .setAuthor({
                    name: server.name,
                    iconURL: server.iconURL({ dynamic: true, size: 1024 })
                })
                .setFooter({
                    text: `Developed By DClist`,
                    iconURL: server.iconURL({ dynamic: true })
                })
                .setThumbnail(server.iconURL({ dynamic: true, size: 1024 }))
                .setDescription(`
__**GENEL BİLGİLER**__
 
Sunucu Adı: **${server.name}**
Sunucu ID: **${server.id}**
Sunucu Owner ID: **${server.ownerId}**
Kategori: **${category ? category.categoryName : "Doğrulanmamış"}**
              
__**SES BİLGİLERİ**__
<:TopSes:1046438719936282715> Toplam Ses: **${server.channels.cache.filter(channel => channel.type == ChannelType.GuildVoice).map(channel => channel.members.size).reduce((a, b) => a + b)}**
<:SesBot:1046438722880671754> Sesteki Bot Sayıs   ı: **${server.members.cache.filter(members => members.user.bot && members.voice.channelID).size}**
<:Camera:1046438726869458965> Kamera: **${server.members.cache.filter(members => !members.user.bot && members.voice.selfVideo).size}**
<:deaf:1046437591685288026> Sağırlaştırılmış: **${server.members.cache.filter(members => !members.user.bot && members.voice.selfDeaf).size}**
<:micOff:1046438466805846116> Susturulmuş: **${server.members.cache.filter(members => !members.user.bot && members.voice.selfMute).size}**           
<:streaming2:1046441062014668871> Yayında: **${server.members.cache.filter(members => !members.user.bot && members.voice.streaming).size}**                 
`)
            ]
        })

    }
}