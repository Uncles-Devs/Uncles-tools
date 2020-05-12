const figlet = require('figlet');

module.exports = async (bot) => {
    const url = await bot.generateInvite("ADMINISTRATOR");
    figlet('     Uncles Tools >>>', function(err, data) {
        if (err) {
            console.log('An error occured');
            return;
        }
        console.log(data)
        console.log('     ==================================================================')
        console.log(' ')
        console.log(`             Commads: ${bot.commands.size}`)
        console.log(`             Guilds:  ${bot.guilds.cache.size}`)
        console.log(`             Users:   ${bot.users.cache.size}`)
        console.log(`             Date:    ${new Date().toLocaleDateString()}   `)
        console.log(`             Invite: ${url}`)
    })
    
    
   

    const { prefix } = require("../../botconfig.json")

   let statuses = [
       `${prefix}help`,
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "STREAMING", url: 'https://www.twitch.tv/duckydevs'});

   }, 5000);

};