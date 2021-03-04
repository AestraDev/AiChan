const { MessageEmbed, version: djsversion } = require("discord.js")

const { name, version } = require("../../package.json")

const moment = require("moment")
require('moment-duration-format')

module.exports = {

  name: "botinfo",

  description: "Get information about the bot",

  cooldown: 5000,

  aliases: ["aichaninfo", "info"],

  category: "Information",

  run: async (client, message, args) => {

    const servers = client.guilds.cache.size.toLocaleString()

    const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()

    const channels = client.channels.cache.size.toLocaleString()

    const commands = client.commands.size.toLocaleString();

    const createdAt = moment(client.user.createdTimestamp).format('ddd, MMM Do YYYY')

    const uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

    
    const AiChan = new MessageEmbed()

      .setAuthor(`AiChan`, client.user.displayAvatarURL())

      .setThumbnail(client.user.displayAvatarURL())

      .setColor(`#B40535`)

      .addFields(
        {
          name: ":computer: Information",

          value: `Servers: \`${servers}\`\nUsers: \`${users}\`\nChannels: \`${channels}\`\nCommands: \`${commands}\`\nUptime: \`${uptime}\`\nCreated At: \`${createdAt}\``,

          inline: true
        },
        {
          name: ":blue_book: Libraries",

          value: `AiChan Version:- \`${version}\`\nNode Js Version:- \`${process.version}\`\nDiscord Js Version:- \`v${djsversion}\``,

          inline: true
        },
        {
          name: "Developer",

          value: `[<@!538627730921619486>]`,

          inline: false
        }
      )
      .setTimestamp()

    message.channel.send(AiChan)

  }
}
