//When someone is banned from a server
const Discord = require('discord.js')

module.exports = async (bot, guild, user) => {
  let settings;
  try {
      settings = await bot.getGuild(guild)
  } catch (e) {
      console.log(e)
  }
  //Check if moderation plugin is on
  if (settings.ModLog == false) return
  //Check if moderation channel is valid
  if (settings.ModLogEvents.includes('GUILDBANADD')) {
    var embed = new Discord.MessageEmbed()
      .setDescription(`${user.toString()}\n${user.tag}`)
      .setFooter(`ID: ${user.id}`)
      .setThumbnail(`${user.displayAvatarURL()}`)
      .setAuthor(`User: Banned`)
      .setTimestamp()
    var channel = guild.channels.cache.find(channel => channel.id == settings.ModLogChannel)
    if (channel) {
      channel.send(embed)
    }
    //log event in console
    bot.logger.log(`Guild member: ${user.username} has been banned from Server: [${user.guild.id}].`);
  }
};
