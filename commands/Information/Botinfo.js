const { MessageEmbed, version: djsversion } = require("discord.js");

const { version } = require("../../package.json");

const moment = require("moment");
require('moment-duration-format');

module.exports = {

  name: "botinfo",

  description: "Get information about the bot",

  cooldown: 5000,

  aliases: ["aichaninfo", "info"],

  category: "Information",

  run: async (client, message, args) => {

    const servers = client.guilds.cache.size.toLocaleString(); // Total servers the AiChan in,

    const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(); // Total users of every server that the AiChan in,

    const channels = client.channels.cache.size.toLocaleString(); // Total channels of every server that the bot in

    const commands = client.commands.size.toLocaleString(); // Total number of commands that AiChan have.

    const createdAt = moment(client.user.createdTimestamp).format('ddd, MMM Do YYYY'); // The date when AiChan has been created. Used moment package for better format

    const uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]"); // Uptime of AiChan


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

          value: `<@!538627730921619486>`, // You can add your id too :)

          inline: false
        },
        {
          name: "** **", // We used ** ** So it won't display it.

          value: "[Invite](https://discord.com/oauth2/authorize?client_id=798290520794857482&scope=bot&permissions=8) | [Support Server](https://discord.gg/NTvrRd72WM) | [Source](https://github.com/Colderry/AiChan)" // You can replace or add your own links. Remember to make like [Your Text](Your Link)
        }
      )
      .setTimestamp()

    message.channel.send(AiChan) // Sends the message embed

  }
}
