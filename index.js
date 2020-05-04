
// Requring the packages and modules required
const { ErelaClient, Utils } = require('erela.js');
const { host, password, port } = require('./botconfig.json')
const { Client, Collection} = require("discord.js");
const bot = new Client();
const fs = require("fs");
//Used for logging bot in
const { token } = require("./botconfig.json");
//Modmail


//Creating command an aliases collection
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.categories = fs.readdirSync("./commands/");

bot.login(token)







