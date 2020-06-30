function correctXp(num, digits) {
	var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
		decimal;

	for (var i = units.length - 1; i >= 0; i--) {
		decimal = Math.pow(1000, i + 1);

		if (num <= -decimal || num >= decimal) {
			return +(num / decimal).toFixed(digits) + units[i];
		}
	}

	return num;
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

module.exports = { correctXp, sleep };
