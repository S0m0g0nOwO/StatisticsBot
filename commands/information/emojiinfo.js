const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'эмодзи',
    aliases: ['эмодзиинфо', 'эмодзинф', 'эминф', 'эмози', 'эможи'],
    description: 'Полная информация эмодзи',
    usage: "эмодзи",
    category: "Server Information",
    run: async (client, message, args) => {

if (!args[0] || !args[0].startsWith("<") || !args[0].endsWith(">") || !args[0].includes(":")) return message.channel.send(`Пожалуйста, укажите кастомный эмодзи`);

        let Thinger = args[0].split(":");

        let Animated;
        if (Thinger[0] === "<a") {
          Animated = true;
        } else {
          Animated = false;
        };

        const Name = Thinger[1];
        const ID = Thinger[2].slice(0, -1);
        const Link = `https://cdn.discordapp.com/emojis/${ID}.${Animated ? "gif" : "png"}?v=1`;

        const Embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setThumbnail(Link)
        .setTitle(`Информация об данном эмодзи!`)
        .setDescription(`
**Название: ** ${Name}
**Анимирован: ** ${Animated ? "Да" : "Нет"}
**Ссылка: ** [Нажми на меня](${Link})
`)
		.setFooter(`ID: ${ID}`)
        return message.channel.send(Embed);
    }
}
