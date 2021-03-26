const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'сервер',
    aliases: ['серверинфо', 'серверинф', 'сервинф'],
    description: 'Полная информация сервера',
    usage: "сервер",
    category: "Server Information",
    run: async (client, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " День" : " Дней") + " назад";
    };

let filtr = {
	"DISABLED": "Не сканировать медиаконтент",
	"MEMBERS_WITHOUT_ROLES": "Сканировать медиаконтент участников без роли",
	"ALL_MEMBERS": "Сканировать медиаконтент всех участников"
}

let futrs = {
	"ANIMATED_ICON": "Анимированная иконка",
	"BANNER": "Баннер",
	"COMMERCE": "Торговля",
	"COMMUNITY": "Сообщество",
	"DISCOVERABLE": "Открытый",
	"FEATURABLE": "Особенный",
	"INVITE_SPLASH": "Фон приглашений",
	"NEWS": "Новости",
	"PARTNERED": "Партнер",
	"RELAY_ENABLED": "Трансляция включена",
	"VANITY_URL": "Собственный URL приглашения",
	"VERIFIED": "Верифицирован",
	"VIP_REGIONS": "ВИП Регион",
	"WELCOME_SCREEN_ENABLED": "Экран приветствие включен"
}

   let verifilv = {
            "NONE": "Отсутствует",
            "LOW": "Низкий",
            "MEDIUM": "Средний",
            "HIGH": "Высокий",
            "VERY_HIGH": "Очень Высокий",
        }

        let region = {
            "brazil": ":flag_br: Бразилия",
            "europe": ":flag_eu: Европа",
            "eu-central": ":flag_eu: Центральная Европа",
            "singapore": ":flag_sg: Сингапур",
            "us-central": ":flag_us: Центральная США",
            "sydney": ":flag_au: Сидней",
            "us-east": ":flag_us: США - Восток",
            "us-south": ":flag_us: США - Юг",
            "us-west": ":flag_us: США - Запад",
            "eu-west": ":flag_eu: Западная Европа",
            "vip-us-east": ":flag_us: США - Восток - VIP",
            "london": ":flag_gb: Лондон",
            "amsterdam": ":flag_nl: Амстердам",
            "hongkong": ":flag_hk: Гонконг",
            "russia": ":flag_ru: Россия",
            "southafrica": ":flag_za:  Южная Африка"
        };

        const createdTimestamp = moment.utc(message.guild.createdAt).format("YYYYMMDD");


    let syschannel = message.guild.channels.cache.get(message.guild.systemChannelID || channelID);

        message.guild.members.fetch(message.guild.ownerID).then((member) => {
            const ServerEmbed = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setTitle("Информация о сервере " + message.guild.name)
				.setDescription(`
**Создатель:**    <@!${message.guild.ownerID}> | ${member.user.username}#${member.user.discriminator} | ${message.guild.ownerID}
**Регион:**       ${region[message.guild.region]}
**Дата Создания:**   ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})
**Уровень Проверки:**   ${verifilv[message.guild.verificationLevel]}
**Уровень фильтрации:** ${filtr[message.guild.explicitContentFilter]}
**Участников:**    ${message.guild.members.cache.filter(member => !member.user.bot).size}** | Ботов: ** ${message.guild.members.cache.filter(member => member.user.bot).size}
**<:online:819577924293754930>:** ${message.guild.members.cache.filter(member => member.presence.status == "online").size}
**<:idle:819578201490849832>:** ${message.guild.members.cache.filter(member => member.presence.status == "idle").size}
**<:DND:819578201419808850>:** ${message.guild.members.cache.filter(member => member.presence.status == "dnd").size}
**<:offline:819577832501280800>:** ${message.guild.members.cache.filter(member => member.presence.status == "offline").size}
**Каналов:**      ${message.guild.channels.cache.size}** | Текст: **${message.guild.channels.cache.filter(ch => ch.type === "text").size}** | Голос: **${message.guild.channels.cache.filter(ch => ch.type === "voice").size}** | АФК: **${message.guild.afkChannel ? message.guild.afkChannel.name : "Отсутствует"}** | Время АФК: **${message.guild.afkTimeout / 60} Минут
**Системный канал:** ${syschannel}
**Ролей:** ${message.guild.roles.cache.size}
**Эмодзи:** ${message.guild.emojis.cache.size}
**Функции:** ${message.guild.features.map(m => m).join(", ").toLowerCase() || 'Нет функций'}
**Баннер:** [Ссылка](${message.guild.bannerURL({size: 2048, format: "png"})})
**Фон приглашения:** [Cсылка](${message.guild.splashURL({size: 2048, format: "png"})})
**Количество бустов:** ${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier} Уровень)
**Канал публичных обновлений:** <#${message.guild.publicUpdatesChannelID}>
**Канал правил:** <#${message.guild.rulesChannelID}>
					`)
				
                .setTimestamp()
                .setFooter(`ID: ${message.guild.id}`)
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))

            message.channel.send(ServerEmbed).catch(err => console.log(err));

        })
    }
}