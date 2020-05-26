const { prefix} = require("../../botconfig.json");
const { MessageEmbed } = require('discord.js');
const rateLimitXP = new Set()

module.exports = async (bot, message) => {
   if (message.author.bot) {
       console.log('bot')
   }
// --------------------------- L E V E L I N G --------------------------- \\
    // Database stuff
    const xpData = require('../../database/models/leveling.js');

    // Random xp to add
    let xpAmount = Math.floor(Math.random() * 1) + 7;

    // Find user in database
    let data = await xpData.findOne({
        userId: message.author.id,
        serverId: message.guild.id
    })

    // If user not in database add them
    if (!data && !message.content.toLowerCase().startsWith(prefix) && !message.author.bot && !rateLimitXP.has(message.author.id)) {
        data = new xpData({
            username: message.author.username,
            userId: message.author.id,
            serverId: message.guild.id,
            xp: xpAmount,
            totalXp: xpAmount,
            level: 1

        })
        await data.save().catch(err => console.log(err))

        rateLimitXP.add(message.author.id);
        setTimeout(() => {
            rateLimitXP.delete(message.author.id)
        }, 60000)
    } else if (data && !message.content.toLowerCase().startsWith(prefix) && !message.author.bot && !rateLimitXP.has(message.author.id)){
        // If user is in database add the xp
        const curxp = data.xp;
        data.xp = curxp + xpAmount
        data.totalXp = data.totalXp + xpAmount
        await data.save().catch(err => console.log(err))

        rateLimitXP.add(message.author.id);
        setTimeout(() => {
            rateLimitXP.delete(message.author.id)
        }, 60000)
    }

    if (!message.author.bot && data) {
    // If user needs to level up
    const curlvl = data.level
    let nxtLvl = data.level * 78 // how much xp person needs to level up EX. lvl 1 - 250 xp, lvl 2 - 2 times 250xp
    if (nxtLvl <= data.xp) {
        data.level = curlvl + 1
        data.xp = 0
        await data.save().catch(err => console.log(err))
        const lr = require('../../database/models/levelRoles.js')
        let roleFinder = await lr.find({
            serverId: message.guild.id,
            level: data.level
        })

        if (roleFinder.length > 0) {
            roleFinder.forEach(object => {
                const levelRole = object.roles
                levelRole.forEach(role=> {
                    message.member.roles.add(role).catch(err => console.log(err))
                })
            })
        } 
        const lvlupEmbed = new MessageEmbed()
            .setColor('#f7df63')
            .setTitle(message.author.username)
            .setDescription(`**CONGRATS**\nYou are now level ${curlvl + 1}`)
            .setThumbnail(message.author.displayAvatarURL())

        message.channel.send(lvlupEmbed)
        }  
    }
    // Message handaling
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (command) return command.run(bot, message, args).catch(err => console.log(err)) // Return if there is a command
    }

    if (message.mentions.members.get('693085746034245724')) {
        const vv = new MessageEmbed()
        .setColor('#f7df63')
        .setAuthor('Ducky', bot.user.displayAvatarURL())
        .addField('Prefix', `The currect prefix of __**${message.guild.name}**__ is \`${prefix}\`.\nTo execute commands, first write the prefix then the command, example:\n\`${prefix}rank\``)
        .addField('Commands', `You can find the list of all commands by using \`${prefix}help\``)
        .addField('Deatils of a command', `Use \`${prefix}help <command>\`  or \`${prefix}help <category>\` for more information .\n**Example:** \`${prefix}help kick\`, \`${prefix}help levels\``)
        message.channel.send(vv)
    }
}