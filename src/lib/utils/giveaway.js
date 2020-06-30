/* eslint-disable no-unused-expressions */
const { MessageEmbed } = require('discord.js');
const format = require('./format.js');
const edit = require('./edit.js');

class Giveaway {

	constructor(bot, message, giveaway, data) {
		this.client = bot;

		this.message = message;

		this.channel = giveaway.channel;

		this.winnerCount = giveaway.winnerCount;

		this.endTime = giveaway.endTime;

		this.timeRemaning = giveaway.timeRemaning;

		this.prize = giveaway.prize;

		this.hostedBy = giveaway.hostedBy;

		this.msg;

		if (data) {
			this.continue(data);
			console.log('has data');
		} else {
			this.init();
		}
	}

	async init() {
		console.log(this.timeRemaning);
		console.log(this.endTime);
		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(this.prize)
			.setDescription(`React with 🎉 to enter!\nTime remaning: ${await format(this.timeRemaning)}\nHosted by: ${this.hostedBy}`)
			.setFooter(`${this.winnerCount > 1 ? `${this.winnerCount} winners | Ends at` : 'Ends at'} `)
			.setTimestamp(this.endTime);

		this.msg = await this.channel.send(embed);
		await this.msg.react('🎉');

		await edit(this.msg, this.endTime, this.winnerCount, this.hostedBy, this.prize);
	}

}

module.exports = Giveaway;
