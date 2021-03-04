
//-----------------Packages-----------------------
const { Client, Collection } = require("discord.js");

const { config } = require("dotenv");

const { prefix } = require("./modules/config.json")

const emoji = require("./modules/emoji.json")

const db = require("quick.db")

const client = new Client({
    disableEveryone: true
})

const ms = require("ms")
//-------------------------------------------------


//-----------------Collection-----------------------
client.commands = new Collection();

client.aliases = new Collection();

const Cooldown = new Collection();

//-------------------------------------------------

//-----------------Handler Loader------------------
["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//-------------------------------------------------


client.on('message', async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    
    let command = client.commands.get(cmd);
    
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command.cooldown) {
      if (Cooldown.has(`${command.name}${message.author.id}`))
        return message
          .reply({
            embed: {

              color: "RED",

              title: `Cooldown`,

              description: `Command currently on a \`${ms(
                Cooldown.get(`${command.name}${message.author.id}`) - Date.now(),
                { long: true }
              )}\` cooldown.`

            }
          })
          .catch(console.error);
      Cooldown.set(
        `${command.name}${message.author.id}`,
        Date.now() + command.cooldown
      );
      setTimeout(() => {
        Cooldown.delete(`${command.name}${message.author.id}`);
      }, command.cooldown);
    }

    
    if (command) 
        command.run(client, message, args, db, emoji);

})

client.login(process.env.Token).catch(err => {
    console.log("Invalid Token Provided")
})
