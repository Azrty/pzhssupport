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

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "general").send(`Bienvenue dans la **PZH's Community**, ${member} !`)
})

bot.on("guildMemberRemove", member =>{
    member.guild.channels.find("name", "general").send(`${member} vien de quitter la **PZH's Community** :/`)
})

bot.login(process.env.TOKEN);


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
      
    if (message.content === prefix + "help"){
        var embed = new Discord.RichEmbed()
            .setTitle("Page d'aide")
            .setDescription("Liste des commandes:")
            .addField(".support", "Une question ? Un problème ? Autre ? Fait cette commande", true)
            .addField(".xp", "Tu souhaites savoir t'es XP ? Fait cette commande", true)
            .addField(".info", "Information sur le Bot Support", true)
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setColor("0x48C9B0")
            .setFooter("Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
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
            .addField("Version du bot", "Version 2.0.9", true)
            .addField("Dernière mise à jour:", "Le 03/03/2018 à 18:00", true)
            .addField("à savoir", "Si vous cliquez sur [PZH](https://www.youtube.com/c/pzhcodage), cela vous redirigera sur sa chaîne YouTube", true)
            .setColor("0xE74C3C")
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setFooter("Toute ressemblance avec un autre bot serait qu'une pure coïncidence. Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
    }

    if (message.content.startsWith(prefix + "oodere5ntr")) {
        message.delete();
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.channel.sendMessage(thingToEcho)
    }

bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', 'Membre');
    member.addRole(role)

bot.on("guildMemberAdd", member => {
        var embed = new Discord.RichEmbed()
        .setTitle("Nouvelle arrivant !")
        .setDescription("Souhaitez lui la bienvenue !")
        .addField(`Bienvenue ${member.user.username} !`, "Nous te souhaitons un bon moment parmis la PZH Community", true)
        .addField("Avant de t'aventurer sur le Discord, merci de regarder le #reglement", "C'est pour une bonne cause :p", true)
        .addField("La commande .help et en ta posséssion", "Utilise la que dans #commandes_bots", true)
        .addField("Si tu as besoin d'aide pour du codage, vien dans #support ", "Et non dans le #general, etc.. :p", true)
        .addField("Tu peux parler de t'es jeux vidéos préférés dans les channels fait pour", "Pas autre part :p", true)
        .setColor("0xE74C3C")
        .addField("Si tu souhaites créer ton propre bot discord:", "Suit les tuto de [PZH](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
        .setFooter("Bon moment parmis la PZH's Community")
    member.guild.channels.find("name", "general").sendEmbed(embed)
    member.guild.channels.find("name", "general").send(`${member} le message au dessus, il t'est dédié. **Lit le**`)
        
bot.on("guildMemberRemove", member => {
        var embed = new Discord.RichEmbed()
        .setTitle("Une personne vien de nous quitter")
        .setDescription(":/")
        .addField(`Il sagit de ${member.user.username} :/`, "Au revoir..", true)
        .setColor("0xE74C3C")
    member.guild.channels.find("name", "general").sendEmbed(embed)
})})})}})
