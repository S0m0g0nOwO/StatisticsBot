const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'роль',
    aliases: ['рольинфо', 'рольинф', 'рлинф'],
    description: 'Полная информация ролей',
    usage: "роль",
    category: "Server Information",
    run: async (client, message, args) => {

function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " День" : " Дней") + " назад";
    };

const rl = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();
if (!rl) return message.reply("Укажите роль");


 const embed = new Discord.MessageEmbed()
                .setColor(rl.color)
                .setTitle("Информация об данной роли")
                .setDescription(`
**Название: ** <@&${rl.id}> | ${rl.name}
**Цвет: ** ${rl.color}
**Упоминаемый: ** ${rl.mentionable ? 'Да' : 'Нет'}
**Создан: ** ${rl.createdAt.toUTCString().substr(0, 16)} (${checkDays(rl.createdAt)})
                `)
                .setFooter(`ID: ${rl.id}`)
                

            await message.channel.send(embed)
        }}