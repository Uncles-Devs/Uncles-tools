const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../botconfig.json');
const { readdirSync } = require('fs');


module.exports = {
    config: {
        name: "help",
        aliases: ["helpme", "commands", "cmds", "help"],
        usage: "duc help\nduc help levels\nduc help rank",
        description: "",
        category:"general",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        if (!args[0]) {
            const hEmbed = new MessageEmbed()
            .setColor('#f7df63')
            .setAuthor('Ducky\'s Commands List', bot.user.displayAvatarURL())
            .setDescription('You can use `duc help [command]` or `duc help [category]` for more help. Example: `duc help rank`')
            .addField('**General**', `\`${prefix}help general\``, true)
            .addField('**Levels**', `\`${prefix}help levels\``, true)
            .addField('**Moderation**', `\`${prefix}help moderation\``, true)
            .setThumbnail(bot.user.displayAvatarURL({ size: 1024 }))

            return message.channel.send(hEmbed)
        } else {
            const categorySearch = bot.commands.filter(c => c.config.category === args[0].toLowerCase())
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()))

            
                if (!command) {
                if(categorySearch.size === 0) return;
                const category = new MessageEmbed()
                .setColor('#f7df63')
                .setTitle(`**${args[0].slice(0, 1).toUpperCase() + args[0].slice(1)} Commands**`)
                .setDescription(categorySearch.map(c => `\`${c.config.name}\``).join(' '))
                message.channel.send(category)
                }
    
                if (command) {
                command = command.config
    
                const embed = new MessageEmbed()
                .setColor('#f7df63')
                .setTitle(`**duc ${command.name.slice(0, 1).toLowerCase() + command.name.slice(1)} info**`)
                .setDescription(`${command.description}`)
                .addField('Usage' , `\`\`\`${command.usage}\`\`\``)
                .addField('Aliases', `\`${command.aliases ? command.aliases.join('`, `') : `No aliases`}\``)
    
                 message.channel.send(embed)
                } 
        }
    }
}