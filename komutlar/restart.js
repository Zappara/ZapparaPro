const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
  let embed = new Discord.RichEmbed()
  .setTitle("Restart | Yeniden Başlat")
  .setDescription("Üzgünüm `restart` komutunu sadece yapımcısı @Enes Onur Ata#9427 kullanabilir!")
  .setColor("#cdf785");
  if(message.author.id !== '274551537139712001') return message.channel.send(embed);
  
message.channel.send(`Yeniden Başlatıldım » ${Math.floor(bot.ping)}ms`).then(() =>{
process.exit(1);
})
 

                                           }
module.exports.help = {
name: "restart"
}
