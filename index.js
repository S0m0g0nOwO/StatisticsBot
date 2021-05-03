const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
require('dotenv').config();

const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.once("ready", () => {
  console.log("ОК!");
  client.user.setPresence({activity: {name: `.хелп`}, status: 'idle', type: 'WATCHING'});
});

fs.readdir('./events/', (err, files) => { 
    if (err) return console.error(err); 
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); 
        if (eventFunction.disabled) return; 

        const event = eventFunction.event || file.split('.')[0]; 
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; 
        const once = eventFunction.once; 

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
        } catch (error) {
            console.error(error.stack); 
        }
    });
});


client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong!');
  }
});

client.on('message', message => {
    //var prefix = "!";
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === "бот") {
              let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} Дней, ${hours} Часов, ${minutes} Минут и ${seconds} Секунд`;

  message.channel.send(`• Время работы: ${uptime}`)
} else if (command === "инвайт") {
  message.channel.send("https://discord.com/oauth2/authorize?client_id=814232628177141770&scope=bot&permissions=8")
}})

client.login(process.env.DISCORD_TOKEN);
