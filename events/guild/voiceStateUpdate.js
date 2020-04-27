module.exports = async (bot, oldMember, newMember) => {
        if (bot.music.players.get(newMember.guild.id) === undefined) {
        } else {
            const { voiceChannel } = bot.music.players.get(newMember.guild.id)

            if (oldMember.channel === null) return;

            if (oldMember.channel.members.size === 1) {
                setTimeout(() => {
                    if(oldMember.channel.members.size > 1) return;
                    bot.music.players.destroy(oldMember.guild.id)
                }, 25000)
            }  
        }
    }