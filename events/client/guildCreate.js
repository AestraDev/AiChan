const { MessageEmbed } = require("discord.js");

const Channel = "813789957088083998";
// For this event, we are not gonna use any database because It's personal event not for public. :) 

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Highest'
};

const moment = require("moment");

const ordinal = require("ordinal-numbers");

module.exports = (client, guild) => {

  const name = guild.name; // Guild Name

  const id = guild.id; // Guild ID

  const owner = guild.owner.user.username; // Owner Username

  const ownerid = guild.owner.id; // Owner ID

  const memberCount = guild.memberCount; // MemberCount

  const serverCount = ordinal(client.guilds.cache.size); // ServerCount Of Client. Using ordinal package for st, rd and th.

  const createdAt = moment(guild.createdAt).format("ddd, MMM Do YYYY"); // Guild Created Date. Used moment for better format.

  let x = Date.now() - guild.createdAt;

  let y = Math.floor(x / 86400000); // For getting Guild Created Date in Days format.

  const security = verificationLevels[guild.verificationLevel]; // Guild Security

  let Added = new MessageEmbed()

    .setTitle("Guild Added")

    .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))

    .setColor("GREEN")

    .setDescription(
      `\`\`\`yaml\n• Name : ${name}\n• Owner : ${owner}\n• Guild ID : ${id}\n• Owner ID : ${ownerid}\n• Security : ${security}\n• Members : ${memberCount}\n• Count : ${serverCount}\n• Server Created : ${createdAt} ${y} Days ago\`\`\``
    )
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Added); // Gets the channel and send the embed

}
