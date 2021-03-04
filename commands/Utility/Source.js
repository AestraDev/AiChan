const { MessageEmbed } = require("discord.js")

module.exports = {

  name: "source",

  description: "Get link to the source of AiChan.",

  cooldown: 5000,

  category: "Utility",

  run: async (client, message, args) => {

  const source = new MessageEmbed()
    
    .setAuthor(client.user.username, client.user.displayAvatarURL())

    .setTitle("Source")

    .setThumbnail(`https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png`)

    .setDescription("[Click Here](https://github.com/Colderry/AiChan)")

    .setColor("PURPLE")

    .setTimestamp()

    message.channel.send(source)

  }
}
