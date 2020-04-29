const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "pause",
        aliases: ["pause", "stop"],
        usage: "unc pause\nunc resume",
        description: "Pause the music",
        category:"",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if (!player){
            const nosongs = new MessageEmbed()
            .setColor('RED')
            .setTitle('**Something went wrong**')
            .setDescription('There is no music player in this guild.\n`%play (song/url)` to start the party!')
            message.channel.send(nosongs);
            }

            const voiceChannel = message.member.voice;
            if (!voiceChannel) {
                const error = new MessageEmbed()
                .setColor('RED')
                .setTitle('**Error**')
                .setDescription('Music commands require you to be in a voice channel')
                message.channel.send(error)
            }

            player.pause(player.playing)
                const paused = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Player has ${player.playing ? 'resumed playing' : 'been paused'}`)

            message.channel.send(paused)


    }
}