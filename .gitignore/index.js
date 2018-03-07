const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const config = require("./config.json");

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = (".")

bot.on('ready', function() {
    bot.user.setActivity("MAINTENANCE EN COURS");
    console.log("Connecté avec succès");
});


bot.login("NDAwNjU3MTIwMzk3MjMwMDgw.DYAUUg.Mg0nPrNQDY9n5CqDc9irSvfVrMc");

bot.on('message', message => {

    if(message.content === prefix + "infodiscord")
        var embed = new Discord.RichEmbed()
            .setDescription("Information du Discord")
            .addField("Nom du Discord", message.guild.name)
            .addField("Crée le", message.guild.createdAt)
            .addField("Tu as rejoin le", message.member.joinedAt)
            .addField("Utilisateurs sur le discord", message.guild.memberCount)
            .setColor("0x0000FF")
        message.channel.sendEmbed(embed);

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
            return message.reply("Merci de mentionner l'utilisateur à expluser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expulser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username}** a été expulsé du discord par **${message.author.username}**`)
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
            message.guild.channels.find("name", "general").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)

    }

    if (message.content === prefix + "yt"){
        var embed = new Discord.RichEmbed()
        .setTitle("YouTube")
        .setDescription("Chaîne Codage:")
        .addField("PZH", "[Cliquez ici](https://www.youtube.com/c/pzhcodage)", true)       
        .setColor("0xFF0000")
        .setFooter("PZH est un YouTubeur qui code des bots discord.")
        .setTimestamp()
    message.channel.sendEmbed(embed)

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
            .setTimestamp()
        message.channel.sendEmbed(embed);
    }

    if (message.content === prefix + "help"){
        var embed = new Discord.RichEmbed()
        .setTitle("===== AIDE =====")
        .setDescription("Disponibilité des commandes:")
        .addField(".info", "Information sur le Bot Support", true)
        .addField(".yt", "Envoie le lien de la chaîne YouTube de [PZH](https://www.youtube.com/c/pzhcodage) Ou cliquer sur PZH dans ce message", true)          
        .setColor("0x04B404")
        .setFooter("Bon moment parmis la PZH's Community")
    message.author.sendEmbed(embed)
    message.channel.sendMessage(`${message.author.username}, la page d'aide a été envoyé en message privée :thumbsup:`)
        var embedtwo = new Discord.RichEmbed()
        .setTitle("Modération")
        .setDescription("Commande Modérateur")
        .addField(".ban", "Bannir un utilisateur.", true)
        .addField(".kick", "Expulser un utilisateur.", true)      
        .setColor("0xFF8000")
    message.author.sendEmbed(embedtwo)
        var embedthree = new Discord.RichEmbed()
        .setTitle("Administration")
        .setDescription("Commande Administrateur")
        .addField(".say", "Faire parler le bot", true)
        .addField(".sayge", "Faire parler le bot via un channel externe", true)      
        .setColor("0xFF0000")
    message.author.sendEmbed(embedthree)
        var embedfour = new Discord.RichEmbed()
        .setTitle("UM")
        .setDescription("Update | Modification")
        .addField("Cmd .support supprimé.", "Raison: innutile.", true)
        .addField("Cmd .xp supprimé.", "Raison: Innutile et bouffeur de mémoire.", true)         
        .setColor("0xFE2E2E")
    message.author.sendEmbed(embedfour)
        var embedfive = new Discord.RichEmbed()
        .setTitle("Information")
        .setDescription("Liste des informations:")
        .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)       
        .setColor("0xFFFF00")
        .setFooter("Bon moment parmis la PZH's Community")
        .setTimestamp()
    message.author.sendEmbed(embedfive)

    }
    
    if (message.content.startsWith(prefix + "say")) {
        let modRole = message.guild.roles.find("name", "Admins");
        if(message.member.roles.has(modRole.id)) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.channel.sendMessage(thingToEcho)
    } else {
        message.reply(`tu n'as pas la permission de faire cette commande.`)

    }

    if (message.content.startsWith(prefix + "sayge")) {
        let modRole = message.guild.roles.find("name", "Admins");
        if(message.member.roles.has(modRole.id)) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.guild.channels.find("name", "general").send(thingToEcho)
        message.channel.sendMessage(`${message.author.username}, le message a bien été envoyé dans le channel #general`)
    } else {
        message.reply(`tu n'as pas la permission de faire cette commande.`)

}}}})})
