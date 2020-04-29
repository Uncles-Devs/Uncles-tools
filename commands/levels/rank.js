const xp = require('../../models/xp.js');
const { MessageAttachment } = require('discord.js');
const { Canvas } = require("canvas-constructor");
const { join, resolve } = require('path');
const fetch = require("node-fetch");
Canvas.registerFont(resolve(join(__dirname, '..', '..', 'font.ttf')), 'Discord');

module.exports = {
    config: {
        name: "rank",
        aliases: ["level", "xp", "rank"],
        usage: "unc rank",
        description: "",
        category: "levels",
        noalias: "",
        accessibility: ""
    },
    run: async (bot, message, args) => {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])

            // If no user is mentioned
            if (!member) {
                let data = await xp.findOne({
                    userId: message.author.id,
                    serverId: message.guild.id
                })

                if (!data) {
                    message.channel.send('You are not ranked yet. Start chatting to earn xp')
                } else {
                     // Find users rank
                    const map = new Map()
                    let rank = 0
                    await xp.find({
                        serverId: message.guild.id
                    }).sort([
                        ['xp', 'descending']
                    ]).then(res => {
                        res.forEach((user) => {
                            map.set(++rank, user)
                        })
                    }).catch(err => console.log(err))

                const curxp = data.xp // Users current xp
                const curlvl = data.level // Users current level
                const nxtlvlXP = curlvl * 65 // How much xp user needs to level up

                let color;
                    if (message.author.presence.status == 'online') {
                        color = ['#44b484']
                    } else if (message.author.presence.status == 'idle') {
                        color = ['#fca41c']
                    } else if (message.author.presence.status == 'dnd') {
                        color = ['#f34444']
                    } else if (message.author.presence.status == 'offline') {
                        color = ['#737b8b']
                    }

                    // Start of the canvas
                    const background = (join(__dirname, "..", "..", "img", "rank_card.png")); // Load in the background
                    const name = message.author.tag.length > 20 ? message.member.displayName : message.author.tag; // Check if the usersname will fit
                    const canvas = new Canvas(800, 200); // create the canvas
                    canvas.addImage(background, 0, 0, 800, 200) // Add the background to canvas
                    const image = await fetch(message.author.displayAvatarURL({
                        format: 'jpg',
                        size: 1024
                    }))
                    const avatar = await image.buffer() // Users profile picture
                    canvas.beginPath(); 
                    // Create the username
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign('left')
                    canvas.setTextFont('35pt Discord')
                    canvas.addText(`${name}`, 150, 70, )
                    // Add an underline to text
                    const text = canvas.measureText(`${name}`)
                    canvas.setColor('#2da14e')
                    canvas.addRect(152, 87, text.width + 15, 3)
                    /// Add the users level
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign("left")
                    canvas.setTextFont('20pt Discord')
                    canvas.addText(`Level: ${curlvl}`, 150, 129)
                    // Add the users XP
                    canvas.setTextAlign('center')
                    canvas.addText(`XP: ${curxp}/${nxtlvlXP}`, 350, 129)
                    // Add the users rank
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign('right')
                    canvas.addText(`Rank: ${rank}`, 550, 129)
                    canvas.closePath()
                    // Create the level bar
                    canvas.setColor('#ffffff')
                    canvas.addBeveledRect(20, 150, 646, 37, 17).fill()
                    canvas.save()
                    // Add the moving status bar
                    if (curxp < 1) {
                        canvas.setColor('#ffffff')
                    } else if (curxp > 1) {
                        canvas.setColor('#2da14e')
                    }
                    canvas.addBeveledRect(20, 150, ((65/ (nxtlvlXP)) * curxp) * 6.46, 37, 17).fill()
                    // Add the users profile picture and presence
                    canvas.addCircularImage(avatar, 75, 75, 62)
                    canvas.setColor('#23272a')
                    canvas.addCircle(125, 115, 18)
                    canvas.setColor(color)
                    canvas.addCircle(125, 115, 13)
                    // End of the rank card

                    const attachment = new MessageAttachment(canvas.toBuffer(), `${message.author.id}_rank.png`); // Creates an attachment to send

                    message.channel.send(attachment)
                }
            } else {
                let data2 = await xp.findOne({
                    userId: member.user.id,
                    serverId: message.guild.id
                })

                if (!data2) {
                    message.channel.send('That user is not ranked yet. Tell them to chat to earn xp')
                } else {
                    const map2 = new Map()
                    let rank2 = 0
                    await xp.find({
                        serverId: message.guild.id
                    }).sort([
                        ['xp', 'descending']
                    ]).then(res => {
                        res.forEach((user) => {
                            map2.set(++rank2, user)
                        })
                    }).catch(err => console.log(err))

                    const curxp2 = data2.xp // Users current xp
                    const curlvl2 = data2.level // Users current level
                    const nxtlvlXP2 = curlvl2 * 65 // How much xp user needs to level up

                if (!data2) {
                    message.channel.send('That user is not ranked yet. Tell them to chat to ear xp')
                } else {
                    let color;
                    if (member.user.presence.status == 'online') {
                        color = ['#44b484']
                    } else if (member.user.presence.status == 'idle') {
                        color = ['#fca41c']
                    } else if (member.user.presence.status == 'dnd') {
                        color = ['#f34444']
                    } else if (member.user.presence.status == 'offline') {
                        color = ['#737b8b']
                    }

                    // Start of the canvas
                    const background = (join(__dirname, "..", "..", "img", "rank_card.png")); // Load in the background
                    const name = member.user.tag.length > 20 ?member.displayName : member.user.tag; // Check if the usersname will fit
                    const canvas = new Canvas(800, 200); // create the canvas
                    canvas.addImage(background, 0, 0, 800, 200) // Add the background to canvas
                    const image = await fetch(member.user.displayAvatarURL({
                        format: 'jpg',
                        size: 1024
                    }))
                    const avatar = await image.buffer() // Users profile picture
                    canvas.beginPath(); 
                    // Create the username
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign('left')
                    canvas.setTextFont('35pt Discord')
                    canvas.addText(`${name}`, 150, 70, )
                    // Add an underline to text
                    const text = canvas.measureText(`${name}`)
                    canvas.setColor('#2da14e')
                    canvas.addRect(152, 87, text.width + 15, 3)
                    /// Add the users level
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign("left")
                    canvas.setTextFont('20pt Discord')
                    canvas.addText(`Level: ${curlvl2}`, 150, 129)
                    // Add the users XP
                    canvas.setTextAlign('center')
                    canvas.addText(`XP: ${curxp2}/${nxtlvlXP2}`, 350, 129)
                    // Add the users rank
                    canvas.setColor('#ffffff')
                    canvas.setTextAlign('right')
                    canvas.addText(`Rank: ${rank2}`, 550, 129)
                    canvas.closePath()
                    // Create the level bar
                    canvas.setColor('#ffffff')
                    canvas.addBeveledRect(20, 150, 646, 37, 17).fill()
                    canvas.save()
                    // Add the moving status bar
                    if (curxp2 < 1) {
                        canvas.setColor('#ffffff')
                    } else if (curxp2 > 1) {
                        canvas.setColor('#2da14e')
                    }
                    canvas.addBeveledRect(20, 150, ((65/ (nxtlvlXP2)) * curxp2) * 6.46, 37, 17).fill()
                    // Add the users profile picture and presence
                    canvas.addCircularImage(avatar, 75, 75, 62)
                    canvas.setColor('#23272a')
                    canvas.addCircle(125, 115, 18)
                    canvas.setColor(color)
                    canvas.addCircle(125, 115, 13)
                    // End of the rank card

                    const attachment2 = new MessageAttachment(canvas.toBuffer(), `${member.user.id}_rank.png`); // Creates an attachment to send

                    message.channel.send(attachment2) // Sends sttachment

                    }
                }
                //else {
                // If a user is mentioned
                //let data2 = await xp.findOne({
                //username: member.user.username
                //})

                //if (!data2) {
                //message.channel.send('That user is not ranked yet. Tell them to chat to earn xp')
                //} else {
                //const curxp2 = data2.xp
                //const curlvl2 = data2.level
                //const nxtlvlXP2 = curlvl2 * 350

                //const lvlEmbed2 = new MessageEmbed()
                //.setTitle(message.author.username)
                //.setDescription(`**Level :** ${curlvl2} \n**Exp :** ${curxp2} / ${nxtlvlXP2}`)

                //message.channel.send(lvlEmbed2)
                //}
            }
        } catch (err) {
            console.log(err)
        }
    }
}

//150, 10, 10, 0, 2 * Math.PI