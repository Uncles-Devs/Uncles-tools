const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "leaderbaord",
        aliases: ["leaderboard", "lb", "top"],
        usage: "unc leaderboard",
        description: "Check the server leaderboard",
        category:"levels",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const data = require('../../database/models/leveling.js');

        await data.find({
            serverId: message.guild.id
        }).sort([
            ['totalXp', 'descending']
        ]).then(res => {
            if (res.length === 0) {
            const empty = bot.emojis.cache.find(x => x.id === '712714749867196599')
            const err = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${empty} its kind of quite here. Start chattng to see whos the most active!`)

            message.channel.send(err)
            } else {
                const top = res.slice(0, 10)
                const lUser = top.map(z => z.username)
                const lLevel = top.map(w => w.level)
                const lPoints = top.map (y => y.xp)
                const lNextP = top.map(x => x.level * 65)

                const leadOutp = lUser.map(function(a,b) {
                    let s = b + 1;
                    return[s + '   ' + `**${a}♕**` + '\n       ' + 'Level:' + ' ' + lLevel[b] + '\n       ' +  'XP: ' + lPoints[b] + '/' + lNextP[b]]
                })
                const leadOut = leadOutp.join('\n')

                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(`${message.guild.iconURL()}`)
                .setTitle(`${message.guild.name}'s Experience Leaderboard`)
                .setDescription(`${leadOut}`, true)

                message.channel.send(embed)
            }
        }).catch(err => console.log(err))
    }
}