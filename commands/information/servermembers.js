const Discord = require('discord.js');

module.exports = {
    name: 'серв',
    aliases: ['участники', 'участников', 'учстк', 'стата'],
    description: 'Узнать сколько участников находится на вашем сервере',
    usage: "серв",
    category: "Server Information",
    run: async (client, message, args) => {

message.channel.send(`• Участников: **${message.guild.members.cache.filter(member => !member.user.bot).size}**\n• ботов: **${message.guild.members.cache.filter(member => member.user.bot).size}**`)

	}
}