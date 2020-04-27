const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "leave",
        aliases: ["stop", "leave"],
        usage: "unc leave",
        description: "Leaves the voice channel",
        category:"music",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        try {
            const { channel } = message.member.voice;
            const player = bot.music.players.get(message.guild.id);
            if (!channel) { 
                const error = new MessageEmbed()
                .setColor('RED')
                .setTitle('**Error**')
                .setDescription('Music commands require you to be in a voice channel')
                message.channel.send(error)
                return;
                } else if (!channel) {
                    const error = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('**Error**')
                    .setDescription('Music commands require you to be in a voice channel')
                    message.channel.send(error);
            }
            if (!player) {
                message.channel.send('no player')
            } else {
                bot.music.players.destroy(message.guild.id);
                return message.channel.send("Successfully stopped the music.")
            }
        }
        catch(err) {
            console.log(err)
        }
    }
}