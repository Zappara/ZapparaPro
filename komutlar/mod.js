const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle(":tools: Moderasyon Komutları")
    .addField("`" + message.prefix + "ban`", "Kullanıcıyı yasaklar")
    .addField("`" + message.prefix + "unban`", "Kullanıcının yasağını kaldırır [IDyi kullanın]")
    .addField("`" + message.prefix +"kick`", "Kullanıcıyı atar")
    .addField("`" + message.prefix +"sil`", "Mesajları siler")
    .setFooter("Tüm Komutlar JavaScript'tir. » By Enes Onur Ata#9427")

message.channel.send(embed);
}

module.exports.help = {
  name: "mod"
}
