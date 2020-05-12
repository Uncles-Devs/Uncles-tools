const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "invite",
        aliases: ["invite", "inv"],
        usage: "invite",
        description: "Obtain and invite link for Ducky",
        category:"general",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
        .setColor('#f7df63')
        .setTitle('Get Ducky!')
        .setThumbnail(bot.user.displayAvatarURL({ size: 1024 }))
        .setDescription('Thank you for choosing Ducky! We are still in production please report any bugs. [**Click Here**](https://discordapp.com/api/oauth2/authorize?client_id=693085746034245724&permissions=536341750&scope=bot) to add me to your server.')

        message.channel.send(embed)
    }
}