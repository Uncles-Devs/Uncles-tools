module.exports = {
	config: {
		name: 'ping',
		aliases: ['ping'],
		usage: 'duc ping',
		description: 'Check the ping of Ducky',
		category: 'general',
		noalias: '',
		accessibility: ''
	},
	run: async (bot, message) => {
		const send = await message.channel.send('Ping!');

		send.edit(`Pong! Time taken - **${send.createdTimestamp - message.createdTimestamp}ms**`);
	}
};
