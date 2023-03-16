const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js")
const Stats = require("../Models/Stats")
const Seens = require("../Models/Seens")
const config = require("../config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bilgi")
        .setDescription("Bir kişinin detaylı bilgilerini al!")
        .addStringOption((option) => option.setName("id").setDescription("Bilgi almak istediğiniz kişinin idsi!").setRequired(true)),

    run: async ({ interaction, client }) => {
        if (!interaction.member.roles.cache.has(config.destek.vipRol) && !interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) return interaction.reply({
            content: `
Bu komutu kullanmak için vip rolüne ihtiyacınız var. Sahip olmak için (Tıkla)[https://www.discord.gg/dclist]
        `})

        const memberID = interaction.options.getString("id")
        if (isNaN(memberID)) return interaction.reply({ content: `Lütfen geçerli bir kişi id'si giriniz!`, ephemeral: true })

        let uye = client.users.cache.get(memberID) || await fetchUser(memberID);
        if (!uye) return interaction.reply({
            content: `
Belirttiğin kullanıcıyı bulamıyorum!
            `, ephemeral: true
        })

        let stats = await Stats.find({ userID: uye.id });
        if (!stats) return interaction.reply({
            content: `
Belittiğin üyenin bilgileri bulunmamakta!
            `, ephemeral: true
        })

        let seens = await Seens.findOne({ userID: uye.id });
        if (!seens) return interaction.reply({
            content: `
Belittiğin üyelerin verileri bulunamadı!
            `, ephemeral: true
        })


        stats.map(x => console.log(x.topVoice))

        let SunucuVerisi = stats.filter(x => client.guilds.cache.get(x.guildID))
            .sort((a, b) => b.topVoice - a.topVoice)
            .map((x, index) => `\` ${index + 1} \` **${client.guilds.cache.get(x.guildID) ? client.guilds.cache.get(x.guildID).name : "Bilinmeyen Sunucu!"}**: \` ${client.timing(x.topVoice)} \``)
            .join("\n")

        let SunucuMesajVerisi = stats.filter(x => client.guilds.cache.get(x.guildID))
            .sort((a, b) => b.topMessage - a.topMessage)
            .map((x, index) => `\` ${index + 1} \` **${client.guilds.cache.get(x.guildID) ? client.guilds.cache.get(x.guildID).name : "Bilinmeyen Sunucu!"}**: \` ${x.topMessage ? x.topMessage : 0} mesaj \``)
            .join("\n")

        let detay = ``
        if (seens.lastType == "JOIN VOICE") {
            detay = `**\` ❯ \`** **Son Durum**: \` Ses kanalına katıldı. \`
**\` ❯ \`** **Ses Kanal Bilgisi**: ${seens.newChannelId ? client.channels.cache.get(seens.newChannelId) ? `\` ${client.channels.cache.get(seens.newChannelId).name} \`` : "Bilinmeyen Ses Kanalı!" : "Bilinmeyen Ses Kanalı!"}`
        }
        if (seens.lastType == "LEAVE VOICE") {
            detay = `**\` ❯ \`** **Son Durum**: \` Ses kanalından ayrıldı. \`
**\` ❯ \`** **Ses Kanal Bilgisi**: ${seens.oldChannelId ? client.channels.cache.get(seens.oldChannelId) ? `\` ${client.channels.cache.get(seens.oldChannelId).name} \`` : "Bilinmeyen Ses Kanalı!" : "Bilinmeyen Ses Kanalı!"}`
        }
        if (seens.lastType == "CHANGE VOICE") {
            detay = `**\` ❯ \`** **Son Durum**: \` Ses kanalı değiştirildi. \`
**\` ❯ \`** **Yeni Kanal Bilgisi**: ${seens.newChannelId ? client.channels.cache.get(seens.newChannelId) ? `\` ${client.channels.cache.get(seens.newChannelId).name} \`` : "Bilinmeyen Ses Kanalı!" : "Bilinmeyen Ses Kanalı!"}
**\` ❯ \`** **Eski Kanal Bilgisi**: ${seens.oldChannelId ? client.channels.cache.get(seens.oldChannelId) ? `\` ${client.channels.cache.get(seens.oldChannelId).name} \`` : "Bilinmeyen Ses Kanalı!" : "Bilinmeyen Ses Kanalı!"}`
        }
        if (seens.lastType == "MESSAGE") {
            detay = `**\` ❯ \`** **Son Durum**: \` Metin kanalına mesaj gönderildi. \`
**\` ❯ \`** **Metin İçeriği**: ${seens.messageContent}
**\` ❯ \`** **Metin Kanal Bilgisi**: ${seens.messageChannelId ? client.channels.cache.get(seens.messageChannelId) ? `\` #${client.channels.cache.get(seens.messageChannelId).name} \`` : "Bilinmeyen Metin Kanalı!" : "Bilinmeyen Metin Kanalı!"}`
        }

        let mesajVerisi = seens.lastContent.sort((a, b) => b.date - a.date).splice(0, 10).map((x, index) => {
            return `\` ${index + 1} \` ${x.content} (<t:${String(x.date).slice(0, 10)}:R>) [**${client.channels.cache.get(x.channel) ? `#${client.channels.cache.get(x.channel).name}` : "#deleted-channel"}** | **${client.guilds.cache.get(x.guild) ? client.guilds.cache.get(x.guild).name : "Bilinmeyen Sunucu!"}**]`
        }).join("\n")

        interaction.reply({
            content: `
Merhaba **${interaction.member.user.tag}!** Aşağıda belirtmiş olduğun  <@!${uye.id}> (${uye.tag ? uye.tag : uye.id}) kişisinin bilgileri verilmiştir!

Aşağıda üyenin detaylı analiz bilgileri ve son durum bilgileri belirtilmiştir.
**\` ❯ \`** **Son Görülme**: <t:${String(seens.lastSeen).slice(0, 10)}:R> [**${seens.lastType}**]
**\` ❯ \`** **Son Görülen Sunucu**: \` ${client.guilds.cache.get(seens.guildID) ? client.guilds.cache.get(seens.guildID).name : "Bilinmeyen Sunucu"} \`
${seens.lastSeenVoice ? `**\` ❯ \`** **Son Seste Görülme**: <t:${String(seens.lastSeenVoice ? seens.lastSeenVoice : Date.now()).slice(0, 10)}:R>` : "**` ❯ `** **Son Seste Görülme**: ` Bulunamadı! `"}
${seens.lastSeenMessage ? `**\` ❯ \`** **Son Mesaj Görülme**: <t:${String(seens.lastSeenMessage ? seens.lastSeenMessage : Date.now()).slice(0, 10)}:R>` : "**` ❯ `** **Son Mesaj Görülme**: ` Bulunamadı! `"}
${detay ? detay : ""}

Aşağıda son ses aktifliği sağladığı sunucuların verileri belirtilmiştir.
${SunucuVerisi ? SunucuVerisi : "**Veri bulunamadı.**"}

Aşağıda son mesaj aktifliği sağladığı sunucuların verileri belirtilmiştir.
${SunucuMesajVerisi ? SunucuMesajVerisi : "**Veri bulunamadı.**"}

Aşağıda son güncel 10 mesajın bilgisi belirtilmiştir.
${mesajVerisi ? mesajVerisi : "**Veri bulunamadı.**"} 


            `, ephemeral: true
        })




    }
}

async function fetchUser(userID) {
    try {
        return await client.users.fetch(userID);
    } catch (err) {
        return undefined;
    }
};