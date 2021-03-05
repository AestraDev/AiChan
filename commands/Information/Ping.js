const { MessageEmbed } = require("discord.js")

module.exports = {

  name: "ping",

  description: "Get the ping of the bot",

  cooldown: 10000,

  category: "Information",

  run: async (client, message, args) => {

    const ping = new MessageEmbed()

      .setDescription("Analysing Ping...")

      .setColor("BLUE") 

    const msg = await message.channel.send(ping); // Sends the ping embed

    const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Timestamp of message edit

    const latency = `${Math.floor(msg.createdTimestamp - timestamp)}ms`; // Message Ping

    const apiLatency = `${Math.round(message.client.ws.ping)}ms`; // Client Ping

    const pong = new MessageEmbed()

      .setTitle(`Pong! ❤`)

      .setColor("BLUE")

      .addFields(
        {
          name: client.user.username + " Latency",

          value: latency,

          inline: false
        },
        {
          name: "Api Latency",

          value: apiLatency,

          inline: false
        }
      )
      .setFooter(`${client.user.username}`)


    msg.edit(pong) // Edits the msg ping embed with the pong embed

  }
}
