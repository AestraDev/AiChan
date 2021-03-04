const { readdirSync } = require('fs');

module.exports = (client) => {

  const load = dirs => {

    const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('js'));

    for (const file of events) {

      const evt = require(`../events/${dirs}/${file}`);

      const eName = file.split('.')[0];

      console.log(`   ┏━━━━━━━━━━━━━┓`)
      console.log(`   ┃ Event Loaded┃`)
      console.log(`   ┗━━━━━━━━━━━━━┛`)
      console.log(`\n    ${dirs}/${file}`);

      client.on(eName, evt.bind(null, client));
    }
  };
  ["client", "server"].forEach((x) => load(x));
};
