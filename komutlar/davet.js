const Discord = require('discord.js');
module.exports.run = async(bot, message, args) => {
message.delete();
if(!args[0]) return message.channel.send("Lütfen bot ID girin!")
if(!args[1]) return message.channel.send("Lütfen prefix ile yazın!")
if(message.guild.members.has(args[0])) return message.channel.send("**Botumuz zaten sunucuda görmüyor musun? -_-**")
let channel = bot.channels.get("447103334575505408");
if(message.channel !== channel){
return message.channel.send("Bu komut sadece `bot-invite` kanalında geçerlidir.")
}else{
bot.fetchUser(args[0]).then(i => {
let embed = new Discord.RichEmbed()
.setTitle("Bot added to Queue!")
.setDescription(`Botumuzu davet ettiğin için teşekkürler ${message.author} . It will be first tested and reviewed before [inviting](https://discordapp.com/oauth2/authorize?client_id=${args[0]}&permissions=0&scope=bot), so please be patient.`)
.addField("Davet Eden", `\`${message.author.username}\``, true)
.addField("ID", `\`${args[0]}\``, true)
.addField("Prefix", `\`${args[1]}\``, true)
.addField("Kullanıcı Adı", `\`${i.username}\``, true)
.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`)
.setThumbnail(i.displayAvatarURL)
channel.send(embed).then(msg => msg.react('⏳'))
})
}
}
module.exports.help = {
name: "davet"
}
