const Discord = require('discord.js'); 
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  let guild = message.guild;
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");
  let bots = message.guild.members.filter(m => m.user.bot).size;
  let humans = message.guild.members.filter(m => !m.user.bot).size;
  let channels = message.guild.channels.size;
  let textChannels = message.guild.channels.filter(m => m.type == "text").size;
  let voiceChannels = message.guild.channels.filter(i => i.type == "voice").size;
  let emojis = [];
  guild.emojis.forEach(emoji => {
  emojis.push(`\`${emoji}\``);
  });
  emojis.length === 0 ? emojis = "None" : emojis = emojis.join(", ");

  let roles = [];
  guild.roles.forEach(role => {
    roles.push(`\`${role.name}\``);
  });
  roles = roles.join(", ");

  let embed = new Discord.RichEmbed()
  .setTitle(`Sunucu İstatistikleri`)
  .setColor(botconfig.white)
  .setThumbnail(icon)
  .addField('Sunucu İsmi', guild.name, true)
  .addField('Sunucu ID', guild.id, true)
  .addField('Sunucu Sahibi', `${guild.owner.user.tag}`, true)
  .addField('Oluşturulma Tarihi', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
  .addField('Bölge', guild.region.toUpperCase(), true)
  .addField('Toplam Üye:', guild.memberCount, true)
  .addField('Bot Sayısı:', bots, true)
  .addField('Kullanıcı Sayısı:', humans, true)
  .addField('Verification Level', guild.verificationLevel, true)
  .addField('Yazı Kanalları', textChannels, true)
  .addField('Sesli kanallar', voiceChannels, true)
  .addField(`Roller`, `${guild.roles.size}`, true)
  .addField(`Emojiler`, `${guild.emojis.size}`, true)

  return message.channel.send(embed);
}


module.exports.help = {
  name: "sunucu"
}
