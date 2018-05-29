const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle(":exclamation: İstatistikler")
.addField("`" + message.prefix +"i`", "Botun istatistiklerini gösterir")
.addField("`" + message.prefix +"kullanıcı-istatistik`", "Kullanıcının istatistiklerini gösterir")
.addField("`" + message.prefix +"sunucu-istatistik`", "Sunucunun istatistiklerini gösterir")


message.channel.send(embed);
}

module.exports.help = {
  name: "istatistikler"
}
