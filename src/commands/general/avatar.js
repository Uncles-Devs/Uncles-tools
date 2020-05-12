const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "avatar",
        aliases: ["avatar", "profilepic"],
        usage: "duc avatar\nduc avatar @Mee5",
        description: "View a users avatar",
        category:"general",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
            if (!args[0]) {
                member = message.member
            }

            const embed = new MessageEmbed()
            .setColor('#f7df63')
            .setTitle(`Avatar for ${member.user.username}`)
            .addField(`View as`, `[jpg](${member.user.displayAvatarURL({ dynamic: true, size: Number(1024), format: 'jpg' })}) | [png](${member.user.displayAvatarURL({ dynamic: true, size: Number(1024), format: 'png' })}) | [webp](${member.user.displayAvatarURL({ dynamic: true, size: Number(1024)})})`)
            .setImage(member.user.avatarURL({ size: Number(1024), dynamic: true }))

            message.channel.send(embed)

            // [**Avatar URL**](${member.user.displayAvatarURL({ dynamic: true, size: Number(1024) })})
    }
}








