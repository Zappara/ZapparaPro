  const shorten = require('isgd');
  const Discord = require('discord.js');
  module.exports.run = async(bot, message, args) => {
    if(!args[0]) return message.reply("URL yaz!");
    
    if(!args[1]){
    shorten.shorten(args[0]), function(res) {
    if(res.startsWith('HATA:')) return message.channel.send("**Lütfen geçerli bir adres yaz <URL>**");
       message.channel.send(`**${res}**`);
    }
    
} else {
    shorten.custom(args[0], args[1], function(res) {
      if(res.startsWith('HATA:')) message.channel.send("**Lütfen geçerli bir adres yaz <URL>**");
       message.channel.send(`**${res}**`);
    
    })
    
    
    }
  }
  module.exports.help = {
    name: "link-kısalt"
    }
