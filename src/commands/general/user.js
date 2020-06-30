/* eslint-disable id-length */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	config: {
		name: 'user',
		aliases: ['user', 'ui', 'who'],
		usage: 'unc user',
		description: 'Get information on a user',
		category: 'general',
		noalias: '',
		accessibility: ''
	},
	run: async (bot, message, args) => {
		const member = message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') ||
        x.user.username === args[0]) || message.member;

		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`**Who is ${member.user.username}?**`)
			.addField('ID', member.user.id, true)
			.addField('Nickname', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
			.addField('Joined on', `${moment(member.joinedAt).format('dddd, MMMM Do YYYY [@] h:mm a')}`)
			.addField('Created on', `${moment(member.user.createdAt).format('dddd, MMMM Do YYYY [@] h:mm a')}`)
			.addField(`Roles [${member.roles.cache.size - 1}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `${roles.name}`).join(', ') || 'No roles'}`);

		message.channel.send(embed);
	}
};
