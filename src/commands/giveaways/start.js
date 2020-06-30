const ms = require('ms');

module.exports = {
    config: {
        name: "start",
        aliases: ["start", "giveaway"],
        usage: ["start", ""],
        description: "create a giveaway",
        category:"giveaways",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
       if (!message.member.hasPermission('MANAGE_MESSAGES')) {
           message.channel.send('It seems like you dont have the required permissions to run this command')
       }

       const gChannel = message.channel

       const gDuration = args[0]

       if (!gDuration || isNaN(ms(gDuration))) {
           message.channel.send('Please include a duration, and a number of winners and a prize.\nExample: `duc start 30m 5w this bot`')
       }

       const gWinner = args[1].match(/\d+/g).join(' ')
       console.log(gWinner)
       if (!gWinner || isNaN(gWinner)) {
        message.channel.send('Please include a number of winner, and a prize.\nExample: `duc start 30m 5w this bot`')
       }

       const gPrize = args.slice(2).join(' ')
       if (!gPrize) {
        message.channel.send('Please include a prize.\nExample: `duc start 30m 5w this bot`')
       }

       bot.giveawaysManager.start(gChannel, {
           time: ms(gDuration),
           prize: gPrize,
           winnerCount: gWinner,
           hostedBy: bot.config.hostedBy ? message.author : null,
           messages: {
            giveaway: (bot.config.everyoneMention ? "@everyone\n\n" : "")+"🎉**GIVEAWAY** 🎉",
            giveawayEnded: (bot.config.everyoneMention ? "@everyone\n\n" : "")+"🎉**GIVEAWAY ENDED** 🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**! {url}",
            embedFooter: `${gWinner > 1 ? `${gWinner} winners | Ends at` : 'Ends at'}`,
            noWinner: "Could not deterine a winner!",
            hostedBy: "Hosted by: {user}",
            winners: `${gWinner > 1 ? `${gWinner} winners | Ends at` : 'Ends at'}`,
            endedAt: `${gWinner > 1 ? `${gWinner} winners | Ended at` : 'Ended at'}`,
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
           }
       })
    }
}