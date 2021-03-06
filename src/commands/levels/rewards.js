/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable id-length */
const levelRole = require('../../database/models/rewards.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'rewards',
		aliases: ['rewards', 'rl'],
		usage: 'unc levelRole set 1 @test\nunc levelRole remove @test',
		description: 'add in role rewards for leveling',
		category: 'levels',
		noalias: '',
		accessibility: ''
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('You can not edit what roles you get!');
		} else {
			const condition = args[0];
			if (!condition) {
				message.channel.send('Use rlevel add, remove, or view to use this command');
			}
			if (condition === 'add') {
				const alvl = args[1];
				if (!alvl || isNaN(alvl)) {
					message.channel.send('Please provide a level for this role');
					return;
				}
				const pRole = message.mentions.roles.first();
				if (!pRole) {
					message.channel.send('Mention a role to assign');
				}
				const nRole = message.guild.roles.cache.find(x => x.name === pRole.name);

				if (!nRole) {
					message.channel.send(`no role with the name ${pRole} was found`);
				} else {
					let lr = await levelRole.findOne({
						serverId: message.guild.id,
						roles: nRole.id
					});
					if (!lr) {
						lr = new levelRole({
							serverId: message.guild.id,
							level: alvl,
							roles: nRole.id,
							roleName: pRole
						});
						await lr.save().catch(err => console.log(err));
						message.channel.send(`${pRole} has been set for level ${alvl}`);
					} else {
						lr.level = alvl;
						roles = nRole.id;
						roleName = pRole;
						await lr.save().catch(err => console.log(err));
						message.channel.send(`${pRole} has been updated for level ${alvl}`);
					}
				}
			} else if (condition === 'remove') {
				const rRole = message.mentions.roles.first();
				if (!rRole) {
					message.channel.send('Please mention a role to remove');
				}

				const dRole = message.guild.roles.cache.find(x => x.name === rRole.name);
				if (!dRole) {
					message.channel.send(`No role with the name ${rRole} was found`);
				}
				{
					const lr = await levelRole.findOne({
						serverId: message.guild.id,
						roles: rRole.id
					});
					if (!lr) {
						message.channel.send(`${rRole} has already been removed`);
						return;
					}

					levelRole.findOne({
						serverId: message.guild.id,
						roles: rRole.id
					}).deleteOne().catch(err => console.log(err));
					message.channel.send(`${rRole} has been removed from the system. Users will no longer recieve this role.`);
				}
			} else if (condition === 'view') {
				let rlOut;
				levelRole.find({
					serverId: message.guild.id
				}).sort([
					['level', 'ascending']
				]).then(res => {
					if (res.length === 0) {
						rlOut = 'None';
					} else {
						const rlName = res.map(z => z.roles);
						const rlLevel = res.map(x => x.level);
						const rlOutp = rlLevel.map((a, b) => [`Level: **${a}** Role: <@&${rlName[b]}>`]);
						rlOut = rlOutp.join('\n');
					}
					const embed = new MessageEmbed()
						.setColor('#f7df63')
						.setTitle(`Level rewards`)
						.setDescription(rlOut);

					message.channel.send(embed);
				});
			}
		}
	}
};
