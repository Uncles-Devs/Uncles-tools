const Giveaway = require('../../lib/utils/giveaway.js');
const ms = require('ms');

module.exports = {
	config: {
		name: 'test',
		aliases: ['test'],
		usage: 'r',
		description: 'Get information on a user',
		category: 'general',
		noalias: '',
		accessibility: ''
	},
	run: async (bot, message, args) => {
		const { channel } = message;

		const time = ms(args[0]);

		console.log(time);
		console.log(new Date(Date.now() + time));

		const giveaway = {
			prize: 'Nitro',
			timeRemaning: time,
			endTime: new Date(Date.now() + time),
			winnerCount: '5',
			channel: channel,
			hostedBy: message.author
		};

		// eslint-disable-next-line no-new
		new Giveaway(bot, message, giveaway);
	}
};
