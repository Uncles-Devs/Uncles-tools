async function format(time) {
    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);

    let isDay = days > 0,
        isHour = hours > 0,
        isMinute = minutes > 0;

    let isSecond = seconds > 0

    let dayUnit = days < 2 ? "day" : "days",
        hourUnit = hours < 2 ? "hour" : "hours",
        minuteUnit = minutes < 2 ? "minute" : "minutes",
        secondUnit = seconds < 2 ? "second" : "seconds";

    let pattern =
        (!isDay ? '' : `**${days}** ${dayUnit}, `) +
        (!isHour ? '' : `**${hours}** ${hourUnit}, `) +
        (!isMinute ? '' : `**${minutes}** ${minuteUnit}, `) +
        (!isSecond ? '' : `**${seconds}** ${secondUnit} `)

    if (!isDay && !isHour && !isSecond) {
        pattern = `**${minutes}** ${minuteUnit}`
    }

    if (!isDay && !isMinute && !isSecond) {
        pattern = `**${hours}** ${hourUnit}`
    }

    if (!isHour && !isMinute && !isSecond) {
        pattern = `**${days}** ${dayUnit}`
    }

    return pattern;
}

module.exports = (format);