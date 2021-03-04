const { MessageEmbed } = require("discord.js");

const Channel = "ChannelID";
// For this event, we are not gonna use any database also because it's personal event not for public. :) 

const moment = require("moment");

const ordinal = require("ordinal-numbers");

module.exports = (client, guild) => {

  const name = guild.name; // Guild Name

  const id = guild.id; // Guild ID

  const owner = guild.owner.user.username; // Owner Username

  const ownerid = guild.owner.id; // Owner ID

  const serverCount = ordinal(client.guilds.cache.size); // ServerCount Of Client. Using ordinal package for st, rd and th.

  let Left = new MessageEmbed()

    .setTitle("Guild Left")

    .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))

    .setColor("GREEN")

    .setDescription(
      `\`\`\`yaml\n• Name : ${name}\n• Owner : ${owner}\n• Guild ID : ${id}\n• Owner ID : ${ownerid}\n• Now Server Count : ${serverCount}\`\`\``
    )
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Left); // Gets the channel and send the embed

}
