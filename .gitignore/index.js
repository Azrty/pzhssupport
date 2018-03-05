const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = (".")

bot.on('ready', function() {
    bot.user.setGame("Aide: .help");
    console.log("Connected");
});


bot.login("NDE5ODYzOTAwNDQ4NzUxNjI3.DX7mtw.vDbTmIe-rB-IvVp_zTaeqtFEcwo");

bot.on('message', message => {

    var msgauthor = message.author.id;
    
        if(message.author.bot)return;
    
        if(!db.get("xp").find({user: msgauthor}).value()){
            db.get("xp").push({user: msgauthor, xp: 1}).write();
        }else{
            var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
            console.log(userxpdb);
            var userxp = Object.values(userxpdb)
            console.log(userxp)
            console.log(`Nombre d'xp : ${userxp[1]}`)
    
            db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    
        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Salut ! voici tes statistiques, ${message.author.username} !`)
                .setColor('#009933')
                .setDescription("Si tu es actif, tu peux réclamer le rank Membre Confirmé !")
                .addField("Tes xp:", `${xpfinal[1]} xp`)
                .setFooter("Bon moment parmis la PZH's Community")
            message.channel.send({embed: xp_embed});
    }

    if (message.content === prefix + "support"){
        var embed = new Discord.RichEmbed()
            .setTitle("SUPPORT")
            .setDescription("Page de support")
            .addField("Problème", "Soon | Contacter un Fondateur, Administrateur ou Modérateur", true)
            .addField("Question", "Soon | Contacter un Fondateur, Administrateur ou Modérateur", true)
            .addField("Autre", "Soon | Contacter un Fondateur, Administrateur ou Modérateur", true)
            .setColor("0xF4D03F")
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setFooter("La réponse de PZH n'est pas immédiate, faites preuve de patience. :) Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
    

    }

    if (message.content === prefix + "info"){
        var embed = new Discord.RichEmbed()
            .setTitle("INFO")
            .setDescription("Information du bot")
            .addField("Création", "Le 10/01/2018 à 17h17", true)
            .addField("Créateur", "Crée par [PZH](https://www.youtube.com/c/pzhcodage)", true)
            .addField("Version du bot", "Version 4.0", true)
            .addField("Dernière mise à jour:", "Le 05/03/2018 à 18:02", true)
            .addField("à savoir", "Si vous cliquez sur [PZH](https://www.youtube.com/c/pzhcodage), cela vous redirigera sur sa chaîne YouTube", true)
            .setColor("0xE74C3C")
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setFooter("Toute ressemblance avec un autre bot serait qu'une pure coïncidence. Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
    }

    if (message.content === prefix + "help"){
        var embed = new Discord.RichEmbed()
        .setTitle("===== AIDE =====")
        .setDescription("Disponibilité des commandes:")
        .addField(".support", "Une question ? Un problème ? Autre ? Fait cette commande", true)
        .addField(".xp", "Tu souhaites savoir t'es XP ? Fait cette commande", true)
        .addField(".info", "Information sur le Bot Support", true)
        .addField(".yt", "Envoie le lien de la chaîne YouTube de [PZH](https://www.youtube.com/c/pzhcodage) Ou cliquer sur PZH dans ce message", true)
        .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)           
        .setColor("0x48C9B0")
        .setFooter("Bon moment parmis la PZH's Community")
    message.author.sendEmbed(embed)
    message.channel.sendMessage(`${message.author.username}, la page d'aide a été envoyé en message privée :thumbsup:`)

    }
    
    if (message.content.startsWith(prefix + "say")) {
        let modRole = message.guild.roles.find("name", "Modérateurs");
        if(message.member.roles.has(modRole.id)) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.channel.sendMessage(thingToEcho)
    } else {
        message.reply(`tu n'as pas la permission de faire cette commande.`)
            

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();


    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Modérateurs");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expulser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expulser.");
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
        }).catch(console.error)
    
    }

    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "Modérateurs");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
        member.ban({
            days: args[1] || null,
            reason: `Vous avez été banni`
        })

    
        


bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', 'Membre');
    member.addRole(role)

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "general").send(`Bienvenue ${member} sur le discord de la **PZH's Community** !`)
    
bot.on("guildMemberRemove", member =>{
    member.guild.channels.find("name", "general").send(`${member.user.username} a quitté le discord de la **PZH's Community**... à bientôt :(`)
})})})})}})}}}})
