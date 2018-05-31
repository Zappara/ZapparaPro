const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
message.delete();
  
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":no_entry_sign: **| Senin `MANAGE_MEMBERS` yetkin yok.**");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry_sign: **| Susturamıyorum `BAN_MEMBERS` yetkin yok.**");
  let muterole = message.guild.roles.find(`name`, "Susturuldu");
  
  if(!muterole) return message.channel.send(":no_entry_sign: **| Sunucuda `Susturuldu` isimli rol yok.**")
  

  await(tomute.removeRole(muterole.id));
  let reason = args.join(" ").slice(22)
    let Embed = new Discord.RichEmbed()
  .setTitle("Susturma Kaldır")
  .setColor("#fc6400")
  .addField("Üye", tomute.user.tag)
  .addField("Yetkili", message.author.tag)
  .addField("Sebep", reason ? reason : "None")
  .setTimestamp()
  message.channel.send(":white_check_mark:  **| Üyenin susturma yasağı kalktı artık konuşabilir.**")
let channel= message.guild.channels.find(`name`, 'eoa_unmute')
if(!channel) return message.channel.send(":name_badge: **| Sunucuda `eoa_unmute` kanalı bulunamadı.**")
  channel.send(Embed)

}

module.exports.help = {
  name: "unmute"
}
