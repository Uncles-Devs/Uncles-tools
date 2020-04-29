const { MessageEmbed } = require('discord.js');
let player;

module.exports = {
    config: {
        name: "play",
        aliases: ["play", "join"],
        usage: "unc play",
        description: "Plays music in a server voice channel",
        category: "music",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) {
            const error = new MessageEmbed()
                .setColor('RED')
                .setTitle('**Error**')
                .setDescription('Music commands require you to be in a voice channel')
            message.channel.send(error)
            return;
        } else {
            const permissions = channel.permissionsFor(bot.user)

            const permerr = new MessageEmbed()
                .setColor('RED')
                .setTitle('**Something went wrong**')
                .setDescription('The bot can\'t connect to the voice channel due to missing permissions')

            if (!permissions.has('CONNECT'))
                return message.channel.send(permerr)

            if (!permissions.has('SPEAK'))
                return message.channel.send(permerr)
        }
            const paused = bot.music.players.get(message.guild.id);

            const nosong = new MessageEmbed()
            .setColor('RED')
            .setTitle('**Something went wrong**')
            .setDescription('There is no music player in this guild.\n`%play (song/url)` to start the party!')
        if (!args[0]) {
            if (!paused) {
                message.channel.send(nosong)
            } else if (!paused.playing) {
               paused.pause(false)
               const up = new MessageEmbed()
               .setColor('RED')
               .setDescription('The player has resumed playing')
               message.channel.send(up)
                }
            } else {
                bot.music.search(args.join(' '), message.author).then(async res => {

                    switch (res.loadType) {
                        case "TRACK_LOADED":
                            player = bot.music.players.spawn({
                                guild: message.guild,
                                textChannel: message.channel,
                                voiceChannel: channel
                            });
    
                            player.queue.add(res.tracks[0]);
                            const added = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('**Music Queue**')
                                .setDescription(`Added [${res.tracks[0].title}](${res.tracks[0].uri}) to the queue`)
                            message.channel.send(added)
                            if (!player.playing) player.play()
                            break;
    
                        case "SEARCH_RESULT":
                            player = bot.music.players.spawn({
                                guild: message.guild,
                                textChannel: message.channel,
                                voiceChannel: channel
                            });
    
                            player.queue.add(res.tracks[0]);
                            const addedS = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('**Music Queue**')
                                .setDescription(`Added [${res.tracks[0].title}](${res.tracks[0].uri}) to the queue`)
                            message.channel.send(addedS)
                            if (!player.playing) player.play()
                 }
            }).catch(err => console.log(err))
        }
    }
}