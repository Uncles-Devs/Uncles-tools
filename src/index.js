
// Requring the packages and modules required
const { Client, Collection} = require("discord.js");
const bot = new Client();
const fs = require("fs");

//Used for logging bot in
const { token } = require("./botconfig.json");

//Database connection
const connectDB = require('./database/connect.js')

connectDB();

//Creating command an aliases collection
["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.categories = fs.readdirSync("./src/commands/");

bot.login(token)







