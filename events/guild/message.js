const { prefix} = require("../../botconfig.json");
const { MessageEmbed } = require('discord.js');
const rateLimitXP = new Set()

const { URI } = require('../../botconfig.json')

module.exports = async (bot, message) => {
// --------------------------- L E V E L I N G --------------------------- \\
    // Database stuff
    const xpData = require('../../models/xp.js');
    const mongoose = require('mongoose')
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // Random xp to add
    let xpAmount = Math.floor(Math.random() * 1) + 7;

    // Find user in database
    let data = await xpData.findOne({
        userId: message.author.id,
        serverId: message.guild.id
    })

    // If user not in database add them
    if (!data && !message.content.startsWith(prefix) && !message.author.bot && !rateLimitXP.has(message.author.id)) {
        data = new xpData({
            username: message.author.username,
            userId: message.author.id,
            serverId: message.guild.id,
            xp: xpAmount,
            level: 1

        })
        await data.save().catch(err => console.log(err))

        rateLimitXP.add(message.author.id);
        setTimeout(() => {
            rateLimitXP.delete(message.author.id)
        }, 60000)
    } else if (!message.content.startsWith(prefix) && !message.author.bot && !rateLimitXP.has(message.author.id)){
        // If user is in database add the xp
        const curxp = data.xp;
        data.xp = curxp + xpAmount
        await data.save().catch(err => console.log(err))

        rateLimitXP.add(message.author.id);
        setTimeout(() => {
            rateLimitXP.delete(message.author.id)
        }, 60000)
    }

    if (!message.author.bot) {
        // If user needs to level up
    const curlvl = data.level
    let nxtLvl = data.level * 65 // how much xp person needs to level up EX. lvl 1 - 250 xp, lvl 2 - 2 times 250xp
    if (nxtLvl <= data.xp) {
        data.level = curlvl + 1
        data.xp = 0
        await data.save().catch(err => console.log(err))

        const lvlupEmbed = new MessageEmbed()
            .setTitle(message.author.username)
            .setDescription(`**CONGRATS**\nYou are now level ${curlvl + 1}`)
            .setThumbnail(message.author.displayAvatarURL())

        message.channel.send(lvlupEmbed)
        }  
    }
    // Message handaling
    if (message.content.startsWith(prefix)) {
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (command) return command.run(bot, message, args).catch(err => console.log(err)) // Return if there is a command
    }

    if (
        message.author.bot || // Return if author is a bot 
        message.content.startsWith(prefix) // Return if the message starts with the prefix
    )
        return;
}