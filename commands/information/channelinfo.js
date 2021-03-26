const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'канал',
    aliases: ['каналинфо', 'каналинф', 'кнлинф'],
    description: 'Полная информация канала',
    usage: "канал",
    category: "Server Information",
    run: async (client, message, args) => {

function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " День" : " Дней") + " назад";
    };

const chn = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel;


const typ = {
"dm": "<:settings:819597348945789020> Личные сообщения",
"text": "<:text_emoji:819578201453494324> Текст",
"voice": "<:voice_emoji:819578290784043078> Голосовой",
"category": "<:categoria_emoji:819577832665382954> Категория",
"news": "<:anuncio_emoji:819578290565021826>",
"store": "Магазин",
"unknown": "<:offline:819577832501280800> Неизвестно"
}

const channelembed = new Discord.MessageEmbed()
   	.setColor("YELLOW")
    .setTitle("Информация о канале")
    .setDescription(`
**Название: ** <#${chn.id}>
**Создан: ** ${chn.createdAt.toUTCString().substr(0, 16)} (${checkDays(chn.createdAt)})
**Тип: ** ${typ[chn.type]}
**NSFW: ** ${chn.nsfw ? 'Да' : 'Нет'}
`)
 	.setTimestamp()
	.setFooter(`ID: ${chn.id}`)

            message.channel.send(channelembed).catch(err => console.log(err));

        }
    }