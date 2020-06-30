/* eslint-disable id-length */
const { sleep } = require('../functions/correctXp.js');
const { MessageEmbed } = require('discord.js');

async function edit(message, time, winners, hosted, title) {
	var x = setInterval(async () => {
		var date = new Date(time).getTime();
		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = date - now;

		var d = Math.floor(distance / (1000 * 60 * 60 * 24));
		var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var s = Math.floor((distance % (1000 * 60)) / 1000);

		const isDay = d > 0,
			isHour = h > 0,
			isMinute = m > 0;

		const isSecond = s > 0;

		const dayUnit = d < 2 ? 'day' : 'days',
			hourUnit = h < 2 ? 'hour' : 'hours',
			minuteUnit = m < 2 ? 'minute' : 'minutes',
			secondUnit = s < 2 ? 'second' : 'seconds';

		const count =
            (!isDay ? '' : `**${d}** ${dayUnit}, `) +
            (!isHour ? '' : `**${h}** ${hourUnit}, `) +
            (!isMinute ? '' : `**${m}** ${minuteUnit}, `) +
            (!isSecond ? '' : `**${s}** ${secondUnit} `);

		// Output the result in an element with id="demo"
		if (!count.includes('-')) {
			const embed2 = new MessageEmbed()
				.setColor('GREEN')
				.setTitle(title)
				.setDescription(`React with 🎉 to enter!\nTime Left: ${count}\nHosted by: ${hosted}`)
				.setFooter(`${winners > 1 ? `${winners} winners | Ends at` : 'Ends at'} `)
				.setTimestamp(time);
			message.edit(embed2);
		}

		// If the count down is over, write some text
		if (distance - 5000 < 3000) {
			clearInterval(x);
			console.log('hi');
			const timeLeft = distance - 3000;
			console.log(timeLeft);
			sleep(timeLeft);
			const embed3 = new MessageEmbed()
				.setColor('RED')
				.setTitle(title)
				.setDescription(`React with 🎉 to enter!\nTime Left: **3** seconds\nHosted By: ${hosted}`)
				.setFooter(`${winners > 1 ? `${winners} winners | Ends at` : 'Ends at'} `)
				.setTimestamp(time);
			await message.edit(embed3);
			sleep(1000);
			const embed4 = new MessageEmbed()
				.setColor('RED')
				.setTitle(title)
				.setDescription(`React with 🎉 to enter!\nTime Left: **2** seconds\nHosted By: ${hosted}`)
				.setFooter(`${winners > 1 ? `${winners} winners | Ends at` : 'Ends at'} `)
				.setTimestamp(time);
			await message.edit(embed4);
			sleep(1000);
			const embed5 = new MessageEmbed()
				.setColor('RED')
				.setTitle(title)
				.setDescription(`React with 🎉 to enter!\nTime Left: **1** seconds\nHosted By: ${hosted}`)
				.setFooter(`${winners > 1 ? `${winners} winners | Ends at` : 'Ends at'} `)
				.setTimestamp(time);
			await message.edit(embed5);
			sleep(1000);
			const embed6 = new MessageEmbed()
				.setTitle(title)
				.setDescription(`${winners > 1 ? 'Winners:' : 'Winner:'}\nHosted By: ${hosted}`)
				.setFooter(`${winners > 1 ? `${winners} winners | Ended at` : 'Ended at'} `)
				.setTimestamp(time);
			await message.edit(embed6);
		}
	}, 5000);
}

module.exports = edit;
