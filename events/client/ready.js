const figlet = require('figlet');

module.exports = async (bot) => {
    figlet('     Uncles Tools >>>', function(err, data) {
        if (err) {
            console.log('An error occured');
            return;
        }
        console.log(data)
        console.log('     ==================================================================')
        console.log(' ')
        console.log('             Version: 1.0.0')
        console.log(`             Commads: ${bot.commands.size}`)
        console.log(`             Guilds:  ${bot.guilds.cache.size}`)
        console.log(`             Users:   ${bot.users.cache.size}`)
        console.log(`             Date:    ${new Date().toLocaleDateString()}   `)
    })
    
    
   

    const { prefix } = require("../../botconfig.json")

   let statuses = [
       `${prefix} help`,
       `Test`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000);

};