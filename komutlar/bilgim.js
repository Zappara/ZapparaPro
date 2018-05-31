const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const ms = require('ms');
module.exports.run = async (bot, message, args) => {

  let role = message.member.roles.map(r => `${r.name}`)
  
  let uEmbed = new Discord.RichEmbed()
  .setTitle("Kullanıcı Bilgi")
  .setColor("#e0d318")
  .setThumbnail(message.author.displayAvatarURL)
  .addField("**Kullanıcı Adı**", message.member.displayName, true)
  .addField("**Discriminator**", message.author.discriminator, true)
  .addField("**ID**", message.author.id, true)
  .addField("**Bot mu?**", `${message.author.bot ? "Evet" : "Hayır"}`, true)
  .addField("**Rolü**", `${role}`, true)
  .addField("**Durumu**",`${message.member.presence.status}`)
  .addField("**Rolleri**", `${message.member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Rolü Yok"}`, true)
  .addField("**Ne oynuyor?**", `${message.member.presence.game ? `${message.member.presence.game.name}` : "Şu anda bir şey oynamıyor."}`)
  .addField("**Hesap Oluşturma Tarihi**", `${moment.utc(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${ms(Date.now()- message.author.createdAt, {long: true})})`)
  .addField("**Katılma Tarihi**", `${moment.utc(message.member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${ms(Date.now()- message.member.joinedAt, {long: true})})`);

  message.channel.send(uEmbed);
}

module.exports.help = {
  name: "bilgim"
}
