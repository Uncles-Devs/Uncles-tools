const { MessageEmbed } = require('discord.js');
const { Utils } = require('erela.js');
const numToWords = require('num-words');


module.exports = {
    config: {
        name: "search",
        aliases: ["search", "find"],
        usage: "unc search",
        description: "Search for the song you like",
        category:"music",
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
        const nosong = new MessageEmbed()
            .setColor('RED')
            .setTitle('**Something went wrong**')
            .setDescription('There is no music player in this guild.\n`%play (song/url)` to start the party!')
        if (!args[0])
            return message.channel.send(nosong)

        else {
            let player;

            bot.music.search(args.join(' '), message.author).then(async res => {
                switch (res.loadType) {
                    case "SEARCH_RESULT":

                        let index = 1
                        const tracks = res.tracks.slice(0, 5);
                        const results = new MessageEmbed()
                            .setTitle('**Seach results**')
                            .setDescription(tracks.map((video) => `:${numToWords(index++)}: \`${Utils.formatTime(video.duration, true)}\` **[${video.title}](${video.uri})**`))
                            .addField('Selection options', 'Tyoe a number corresponding to the song you want to play. ie: `5` or `cancel`')
                            .setFooter('Your selcetion will expire in 30 seconds')

                        await message.channel.send(results).then(sent => {
                            const collector = message.channel.createMessageCollector(m => {
                                return m.author.id === message.author.id
                            }, {
                                time: 1000 * 30,
                                max: 1
                            });

                            collector.on('collect', m => {
                                if (m.content === 'cancel') {
                                    collector.stop("cancelled")
                                } else {
                                    const track = tracks[m.content - 1];
                                    player = bot.music.players.spawn({
                                        guild: message.guild,
                                        textChannel: message.channel,
                                        voiceChannel: channel
                                    });
                                    player.queue.add(track)
                                    const added2 = new MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle('**Music Queue**')
                                        .setDescription(`Added [${track.title}](${track.uri}) to the queue`)
                                    message.channel.send(added2)
                                    if (!player.playing) player.play();
                                }
                            })

                            collector.on('end', (_, reason) => {
                                if (['time'].includes(reason)) {
                                    const timeout = new MessageEmbed()
                                        .setColor('RED')
                                        .setTitle('**Timed out**')
                                        .setDescription('You did not answer with a selection in time')
                                    sent.edit(timeout)
                                } else if (['cancelled'].includes(reason)) {
                                    const cancel = new MessageEmbed()
                                        .setColor('RED')
                                        .setTitle('**Cancelled selection**')
                                        .setDescription('Your selection was cancelled')
                                    sent.edit(cancel)
                                }
                            });
                        })
                        break;
                }
            })
        }
    }
}