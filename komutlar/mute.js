const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
message.delete();
  
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":no_entry_sign: **| Senin `MANAGE_ROLES` yetkin yok.**");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(tomute === message.guild.member(message.author)) return message.channel.send("Özürlü müsün? Neden kendini Susturmak istiyorsun?")
  if(!tomute) return message.channel.send(":name_badge: **| Üye bulunamadı.**");
  let muterole = message.guild.roles.find(`name`, "Susturuldu");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Susturuldu",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  

let reason = args.join(" ").slice(22)
  await(tomute.addRole(muterole.id));
  let Embed = new Discord.RichEmbed()
  .setTitle("Susturuldu")
  .setColor("#fc6400")
  .addField("Üye", tomute.user.tag)
  .addField("Yetkili",message.author.tag)
  .addField("Sebep", reason)
  .setTimestamp();
 message.channel.send(":white_check_mark:  **| Üye başarıyla susturuldu.**")
let channel= message.guild.channels.find(`name`, 'eoa_mute')
if(!channel) return message.channel.send(":name_badge: **| Sunucuda `eoa_mute` kanalı bulunamadı.**")
  channel.send(Embed)
  }

module.exports.help = {
  name: "mute"
}
