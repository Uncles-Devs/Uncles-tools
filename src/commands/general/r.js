/* eslint-disable func-style */
module.exports = {
	config: {
		name: 'r',
		aliases: ['r'],
		usage: 'r',
		description: 'Get information on a user',
		category: 'general',
		noalias: '',
		accessibility: ''
	},
	run: async (bot, message, args) => {
		function getEditDistance(a, b) {
			if (a.length === 0) return b.length;
			if (b.length === 0) return a.length;

			var matrix = [];

			// increment along the first column of each row
			var i;
			for (i = 0; i <= b.length; i++) {
				matrix[i] = [i];
			}

			// increment each column in the first row
			var j;
			for (j = 0; j <= a.length; j++) {
				matrix[0][j] = j;
			}

			// Fill in the rest of the matrix
			for (i = 1; i <= b.length; i++) {
				for (j = 1; j <= a.length; j++) {
					if (b.charAt(i - 1) === a.charAt(j - 1)) {
						matrix[i][j] = matrix[i - 1][j - 1];
					} else {
						matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
							Math.min(matrix[i][j - 1] + 1,
								matrix[i - 1][j] + 1));
					}
				}
			}

			return matrix[b.length][a.length];
		}

		let text;
		const words = ['nigger', 'fuck', 'shit', 'bitch', 'cock', 'cunt'];

		const check = args.slice(0);

		console.log(check);
		words.forEach(async word => {
			text = word;
			console.log(text);
			check.forEach(async char => {
				const check2 = getEditDistance(char, text);

				console.log(check2);

				if (check2 <= 2) {
					await message.delete();
					message.channel.send('Hey no bad words allowed');
					console.log('bad word');
				}
			});
		});
	}
};
