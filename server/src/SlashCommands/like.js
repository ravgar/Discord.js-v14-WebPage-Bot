const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType } = require("discord.js")
const config = require("../config.json")
const database = require('../Models/Like');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("like")
        .setDescription("Bir sunucuya beğeni atmanızı sağlar!"),

    run: async ({ interaction, client }) => {
        const timedb = await database.findOne({ userID: interaction.member.id, guildID: interaction.guild.id });
        const userdb = await database.find({ userID: interaction.member.id });
        const databaseAll = await database.find({ guildID: interaction.guild.id });

        var totalLike = 0;
        if (!userdb) {
            return totalLike;
        } else {
            for (let i = 0; i < userdb.length; i++) {
                if (userdb[i].likeCount !== undefined) {
                    totalLike += userdb[i].likeCount;
                }
            }
        }

        var likeCount = timedb ? timedb.likeCount : 1;
        if (!timedb) {
            var db = new database({
                userID: interaction.member.id,
                guildID: interaction.guild.id,
                date: Date.now(),
                likeCount: 1
            });
            db.save();

            var userIndex;
            if (databaseAll) {
                userIndex = databaseAll.findIndex(item => item.userID === interaction.member.id);
            }

            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Yeni bir beğeni!`)
                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024 })
                    })
                    .setFooter({
                        text: `Developed By DClist`,
                        iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
                    .setDescription(`
${interaction.guild.name} Sunucusuna Bir Beğeni Yolladın!

${userIndex === -1 ? "" : `Like sıralamasında ${userIndex + 1}. Sıradasın!`}

\` Detaylı Bilgiler ;\`
    
**\` ❯ \`** Genel oy sayınız: ${totalLike + 1}
**\` ❯ \`** Bu sunucuya verdiğiniz oy sayınız: ${likeCount}      
                    `)
                ]
            })
            await check(interaction.member.id, interaction.guild.id)
            return;
        } else if (!timedb.date) {
            timedb.date = Date.now()
            timedb.save()
            interaction.reply({ content: `Bu sunucuya tekrar oy verebilmek için beklemen gerekli!`, ephemeral: true })
        } else {
            var likeCount = timedb ? timedb.likeCount : 1;
            var timeLike = Date.now() - timedb.date;
            if (timeLike >= 7200000) {
                timedb.date = Date.now()
                timedb.likeCount++
                timedb.save()

                var userIndex = 0;
                if (databaseAll) {
                    userIndex = databaseAll.findIndex(item => item.userID === interaction.member.id);
                }
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Yeni bir beğeni!`)
                        .setAuthor({
                            name: interaction.guild.name,
                            iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024 })
                        })
                        .setFooter({
                            text: `Developed By DClist`,
                            iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
                        .setDescription(`
${interaction.guild.name} Sunucusuna Bir Beğeni Yolladın!
    
${userIndex === -1 ? "" : `Like sıralamasında ${userIndex + 1}. Sıradasın!`}
    
\` Detaylı Bilgiler ;\`
    
**\` ❯ \`** Genel oy sayınız: ${totalLike + 1}
**\` ❯ \`** Bu sunucuya verdiğiniz oy sayınız: ${likeCount}         
                        `)
                    ]
                })
                await check(interaction.member.id, interaction.guild.id)
            } else {
                interaction.reply({ content: `Bu sunucuya tekrar oy verebilmek için beklemen gerekli!`, ephemeral: true })
            }
        }

    }
}

async function check(member, guild) {
    const Guild = require("../Models/Guild");
    const guildData = await Guild.findOne({ guildID: guild });
    if (guildData?.rozet == false) return;

    const sunucu = client.guilds.cache.get(guild)
    const uye = sunucu.members.cache.get(member)
    if (!uye.manageable) return;


    const timedb = await database.findOne({ userID: member, guildID: guild });
    var likeCount = timedb ? timedb.likeCount : 1;

    if (likeCount > 10 && !uye.roles.cache.get(guildData?.first) && !uye.roles.cache.has(guildData?.second)) {
        await uye.roles.add(guildData?.first).catch(err => { });
        uye.send({
            content: `
Tebrikler! :tada: ${sunucu.name} sunucusu için verdiğiniz 10 beğeni sonucunda ${sunucu.roles.cache.get(guildData?.first).name} rolüne eriştiniz!
        `}).catch(err => { })
    } else if (likeCount > 20 && uye.roles.cache.get(guildData?.first) && !uye.roles.cache.has(guildData?.second)) {
        await uye.roles.add(guildData?.second).catch(err => { });
        uye.send({
            content: `
Tebrikler! :tada: ${sunucu.name} sunucusu için verdiğiniz 10 beğeni sonucunda ${sunucu.roles.cache.get(guildData?.second).name} rolüne eriştiniz!
        `}).catch(err => { })
    }
}