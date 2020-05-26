const levels = require('../../database/models/leveling.js');
const levelRoles = require('../../database/models/rewards.js');

module.exports = {
    config: {
        name: "reset",
        aliases: ["reset", "clear"],
        usage: "duc reset @member\nduc reset",
        description: "Rest a user or everyone's level",
        category:"levels",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

        if (!member) {
            await message.channel.send(`Are you sure you want to rest everyone's level in ${message.guild.name}? **This action can not be undone.** `).then(async msg => {
                msg.react('✅')
                msg.react('❌')

                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id ;
                };

                const collector = msg.createReactionCollector(filter, { time: 20000, max: 1 });

                collector.on('collect', async (reaction) => {
                    if (reaction.emoji.name === '❌') {
                        collector.stop('cancelled');
                    } else if (reaction.emoji.name === '✅') {
                        const data = await levels.find({
                            serverId: message.guild.id
                        })

                        if (!data || data.length === 0) {
                            console.log('no data')
                            msg.edit('No one on the server is ranked. Start chatting to use this command')
                        } else {
                           levels.deleteMany({
                               serverId: message.guild.id
                           }).then(() => {
                               setTimeout(() => {
                                msg.edit('Everyone on the guild has been reset')
                               }, 1500)
                           }).catch(err => console.log(err))

                        }
                    } 
                })

                collector.on('end', (_, reason) => {
                    if (['time'].includes(reason)) {
                        msg.edit('**Timed out**')
                    }

                    if (['cancelled'].includes(reason)) {
                        msg.edit('Cancelled the operation')
                    }

                    if (['data'].includes(reason)) {
                        msg.edit('All data for the guild has been removed')
                    }
                })
            })
        } else {
            const xp = await levels.findOne({
                serverId: message.guild.id,
                userId: member.user.id
            })
            if (!xp || xp.length === 0) {
                message.channel.send('That user has no xp to rest')
            } else {
                await levels.findOne({
                    serverId: message.guild.id,
                    userId: member.user.id
                }).deleteOne().catch(err => console.log(err))
                
                const lr = await levelRoles.find({
                    serverId: message.guild.id
                })

                lr.forEach(object => {
                    member.roles.cache.filter(r => r.id !== message.guild.id).forEach(role => {
                        console.log(role.name)
                        if (object.roles == role.id) {
                                member.roles.cache.filter(r => r.id !== message.guild.id).forEach(roll => {
                                    // console.log(roll.name)
                                    member.roles.remove(roll.id)
                                })
                            }
                        }) 
                    })
                }
                message.channel.send('Thats user\'s data has succesfully been reset')
                }
        } 
    }


    