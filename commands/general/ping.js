module.exports = {
    config: {
        name: "ping",
        aliases: ["ping"],
        usage: "unc ping",
        description: "Test the bots latnecy",
        category:"general",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        const send = await message.channel.send('Ping!')

        send.edit(`:ping_pong: | Pong! Time taken - **${send.createdTimestamp - message.createdTimestamp}ms**`)
    }
}