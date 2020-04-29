const { readdirSync } = require("fs")

module.exports = (bot) => {
const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
        const pull = require(`../commands/${dirs}/${file}`);

        if(pull.name) {
            bot.commands.set(pull.name, pull);
        }
        bot.commands.set(pull.config.name, pull);
        if(pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        };
    };
    ["levels", "music", "general"].forEach(x => load(x));
};

/**
 * module.exports = {
    config: {
        name: "",
        aliases: ["", ""],
        usage: "",
        description: "",
        category:"",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {

        // some code here
    }
}
 */