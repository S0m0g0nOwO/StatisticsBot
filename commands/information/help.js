const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "хелп",
    aliases: ['h', 'help', 'х', 'помощь', 'команды', 'commands'],
    description: "Получите список всех команд и даже узнайте подробности каждой команды",
    usage: "хелп <команда>",
    category: "Server Information",
    run: async (client, message, args) => {
        if (args[0]) {
            const command = await client.commands.get(args[0]);

            if (!command) {
                return message.reply("Неизвестная команда: " + args[0]);
            }

            let embed = new MessageEmbed()
                .setDescription(`
        • **Описание: ** ${command.description || "Не предоставлен"} 
        • **Применение: ** ${"`" + command.usage + "`" || "Не предоставлен"}
        • **Алиасы: ** ${"`" + command.aliases + "`" || "Не предоставлен"}
        `)
                .setColor('#00A6FF')

            return message.channel.send(embed).catch(err => console.log(err));
        } else {
            const commands = await client.commands;

            let emx = new MessageEmbed()
                .setTitle("Список всех команд бота")
                .setColor('YELLOW')
                .setFooter(`Для подробной информации используйте: "хелп <команда>"`)
                .setTimestamp()

            let com = {};
            for (let comm of commands.array()) {
                let category = comm.category || "Неизвестно";
                let name = comm.name;

                if (!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }

            for (const [key, value] of Object.entries(com)) {
                let category = key;

                let desc = "`" + value.join("`, `") + "`";

                emx.addField(`${category.toLowerCase()}[${value.length}]`, desc);
            }

            return message.channel.send(emx).catch(err => console.log(err));
        }
    }
}
