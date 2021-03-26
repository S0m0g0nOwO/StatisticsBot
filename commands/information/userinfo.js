const Discord = require('discord.js');
const moment = require("moment");

module.exports = {
    name: 'юзер',
    aliases: ['user', 'userinfo'],
    description: 'Инфомарция об участнике',
    usage: "юзер @Участник#1234 | ID",
    category: "Server Information",
    run: async (client, message, args) => {

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " День" : " Дней") + " Назад";
        };

        function roleList(member) {
            let roleNameString = '';
            member.roles.cache.forEach(role => {
                let roleName = role.id;
                roleNameString += `<@&${roleName}> `
            });
            return roleNameString;
        }
        var user = client.users.cache.find(user => user.id === args[0]) || message.mentions.users.first() || message.author

        const member = message.guild.members.cache.get(user.id)


        let sstatus = {
            "online": "<:online:819577924293754930> В сети",
            "dnd": "<:DND:819578201419808850> Не беспокоить",
            "idle": "<:idle:819578201490849832> Не активен",
            "offline": "<:offline:819577832501280800> Невидимый",
        }




var userbot = {
    "false": "Нет",
    "true": "Да"
}

var badges = {
"DISCORD_EMPLOYEE": "<:toools:819601256594538587>",
"PARTNERED_SERVER_OWNER": "<:discord_partner:819578144532725790>",
"DISCORD_PARTNER": "<:discord_partner:819578144532725790>",
"HYPESQUAD_EVENTS": "<:hypesquad_events:824712985087705118>",
"BUGHUNTER_LEVEL_1": "<:BugHunter:819577777744248832>",
"HOUSE_BRAVERY": "<:hypesquad_bravery:819578144503758891>",
"HOUSE_BRILLIANCE": "<:hypesquad_briliance:819577940643807232>",
"HOUSE_BALANCE": "<:hypesquad_balance:819577924180115465>",
"EARLY_SUPPORTER": "<:early_supporter:824713232966090832>",
"TEAM_USER": "<:toools:819601256594538587>",
"SYSTEM": "<:settings:819597348945789020>",
"BUGHUNTER_LEVEL_2": "<:BugHunterLvl2:819577803192008724>",
"VERIFIED_BOT": "<:discord_bot_dev:819577940755873882>",
"EARLY_VERIFIED_BOT_DEVELOPER": "<:discord_bot_dev:819577940755873882>",
"EARLY_VERIFIED_DEVELOPER": "<:discord_bot_dev:819577940755873882>",
"VERIFIED_DEVELOPER": "<:discord_bot_dev:819577940755873882>"
}



  const userFlags = (await member.user.fetchFlags())
        .toArray()
        .map((flag) => badges[flag])
        .join(" ");
        const UserEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle("Информация об участнике")
            .setDescription(` 
**Никнейм: ** <@!${user.id}> | ${user.username}#${user.discriminator}
**Дата создания: ** ${user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt)})
**На сервере с: ** ${message.guild.member(user).joinedAt.toUTCString().substr(0, 16)} (${checkDays(member.joinedAt)})
**Статус: ** ${sstatus[user.presence.status]}
**Бот: ** ${userbot[user.bot]}
**Роли: ** ${roleList(member)}
**Значки: ** ${ userFlags.length > 0 ? userFlags : "Нету"}
**Последнее сообщение ** ${user.lastMessage}** | Канал: ** <#${user.lastMessageChannelID}>
`)
            .setTimestamp()
            .setFooter(`ID: ${user.id}`)
            .setThumbnail(user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }))
        message.channel.send(UserEmbed).catch(err => console.log(err));
    }
}