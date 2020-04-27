const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../botconfig.json');
const { readdirSync } = require('fs');


module.exports = {
    config: {
        name: "help",
        aliases: ["helpme", "commands", "cmds", "help"],
        usage: "unc help\nunc help rank",
        description: "",
        category:"general",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const hEmbed = new MessageEmbed()
        .setColor('#2da14e')
        .setAuthor('Uncles Tools Commands', bot.user.displayAvatarURL())

        if (!args[0]) {
            const categories = readdirSync("./commands/")

            hEmbed.setDescription(`Here is a list of all my commands. You can use \`${prefix}help [command]\` for more help. Example: \`${prefix}help rank\``)
            
            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    hEmbed.addField(`${capitalise} - ${dir.size}`, dir.map(c => `\`${c.config.name}\``).join(", "))
                } catch(e) {
                    console.log('h')
                }
            })
            return message.channel.send(hEmbed)
        } else {
            const categorySearch = bot.commands.filter(c => c.config.category === args[0].toLowerCase())
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()))

            
                if (!command) {
                if(categorySearch.size === 0) return;
                const category = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`**${args[0].slice(0, 1).toUpperCase() + args[0].slice(1)} Commands**`)
                .setDescription(categorySearch.map(c => `\`${c.config.name}\``).join(', '))
                message.channel.send(category)
                }
    
                if (command) {
                command = command.config
    
                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`**unc ${command.name.slice(0, 1).toLowerCase() + command.name.slice(1)} info**`)
                .setDescription(`${command.description}`)
                .addField('Usage' , `\`\`\`${command.usage}\`\`\``)
                .addField('Aliases', `\`${command.aliases ? command.aliases.join('`, `') : `No aliases`}\``)
    
                 message.channel.send(embed)
                } 
        }
    }
}