	const Discord = require("discord.js");
	const botconfig = require("./botconfig.json");
	const fs = require("fs");
        let prefix = "zp!";
	let bot = new Discord.Client();
	bot.commands = new Discord.Collection();
	const coins = require("./coins.json");
	const xp = require("./xp.json");
	const db = require('quick.db');
        const DBL = require("dblapi.js");
        const dbl = new DBL(process.env.DBL_TOKEN, bot);

	bot.on('ready', () => {
	console.log("Yukleniyor...");
	setTimeout(function(){
	console.log("Zappara Pro Basariyla Yuklendi.");
	}, 1000);
	function botStatus() {
        let status = [
            `Benim Prefixim: ${botconfig.prefix}`,
            `Teşekkürler: ${bot.guilds.size} sunucu.`,
            `Yenilikler: ${botconfig.prefix}y .`,
            `Sahibi: Enes Onur Ata#9427`,
            `Hizmet veriyor: ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcıya`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})

	fs.readdir("./komutlar/", (err, files) => {
    console.log(`Yuklendi ${files.length} komutu.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Komut bulunamadi.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./komutlar/${f}`);
	console.log(`${f} yuklendi.`);
	bot.commands.set(props.help.name, props);
	});
	});
	
    let prefix = ${botconfig.prefix};
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return ;
        if(message.content.toLowerCase() === '<@440815976880275465>'){
        let embed = new Discord.RichEmbed()
       .setTitle("Zappara Pro")
       .addField("Prefix", `\`${prefix}\``, true)
       .addField("Yardım", `\`${prefix}y\``, true)
       .setThumbnail(bot.user.displayAvatarURL)
       .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`);
        message.channel.send(embed);
        }

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
   message.prefix = prefix;


	try {
	let commandFile = require(`./komutlar/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("Bu isimde hiçbir komut bulunamadı.");
	} catch (e) { console.log(e) }

	if(!coins[message.author.id]){
	coins[message.author.id] = {
	coins: 0
	};
	}

	let coinAmt = Math.floor(Math.random() * 15) + 14;
	let baseAmt = Math.floor(Math.random() * 15) + 14;
 

	

	if(coinAmt === baseAmt){
	coins[message.author.id] = {
	coins: coins[message.author.id].coins + coinAmt
	};
	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
	if (err) console.log(err)
	});

	}

	let xpAdd = Math.floor(Math.random() * 15) + 14;
	

	if(!xp[message.author.id]){
	xp[message.author.id] = {
	xp: 0,
	level: 1
	};
	}


	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp =  curxp + xpAdd;
	if(nxtLvl <= xp[message.author.id].xp){
	xp[message.author.id].level = curlvl + 1;

	}
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
	if(err) console.log(err)
	});


	});
	bot.on('guildMemberAdd', member => {
    bot.channels.get('450952678781091842').setName(`Toplam Kullanıcı: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('450952771752034305').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('450952839389511681').setName(`Bot Sayısı: ${bots}`)
	const members = member.guild.memberCount;
	const channel = member.guild.channels.find('name', 'zp_giriş');
	if (!channel) return;
	
       let Role = member.guild.roles.find(`name`, "Bot");
       if(member.user.bot){
	member.addRole(Role.id)
       }else{
      let role = member.guild.roles.find(`name`, "Üye");
	member.addRole(role.id)
       }
 
	let Embed = new Discord.RichEmbed()
	.setFooter(`Üye Katıldı | Üyeler- ${member.guild.memberCount}`)
	.setColor("#cde246")    
	.setAuthor(`**${member.displayName}** isimli üye **${member.guild.name}** sunucusuna katıldı.`, member.user.displayAvatarURL)
	.setTimestamp()
	channel.send(Embed);
	});
	bot.on('guildMemberRemove', member => {
    bot.channels.get('450952678781091842').setName(`Toplam Kullanıcı: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('450952771752034305').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('450952839389511681').setName(`Bot Sayısı: ${bots}`)
	const channel = member.guild.channels.find(`name`, 'zp_çıkış');
	if(!channel) return; 
	let Embed = new Discord.RichEmbed()
	.setColor("#e26346")
	.setAuthor(`**${member.displayName}** isimli üye **${member.guild.name}** isimli sunucudan çıktı.`, member.user.displayAvatarURL)
	.setTimestamp()
	.setFooter(`Üye Çıktı | Üyeler- ${member.guild.memberCount}`)
	channel.send(Embed);
	});

	bot.on('guildCreate', guild => {
	      let channel = bot.channels.get("450955859510427650")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Katıldım ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Sahibi", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
	bot.on('guildDelete', guild => {
	      let channel = bot.channels.get("450955966158995456")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Ayrıldım ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Sahibi", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
	bot.login(process.env.BOT_TOKEN);
