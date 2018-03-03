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
            .setTitle(`Salut ! voici t'es statistiques, ${message.author.username} !`)
            .setColor('#009933')
            .setDescription("Si tu as 500 xp, tu peux réclamer ton grade Membre confirmé !")
            .addField("T'es xp:", `${xpfinal[1]} xp`)
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
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH Codage](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
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
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH Codage](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setFooter("La réponse de MhBurgerKing n'est pas immédiate, faites preuve de patience. :) Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
    

    }

    if (message.content === prefix + "info"){
        var embed = new Discord.RichEmbed()
            .setTitle("INFO")
            .setDescription("Information du bot")
            .addField("Création", "Le 10/01/2018 à 17h17", true)
            .addField("Créateur", "Crée par MhBurgerKing alias [PZH Codage](https://www.youtube.com/c/pzhcodage)", true)
            .addField("Version du bot", "Version 2.0.0", true)
            .addField("Dernière mise à jour:", "Le 14/02/2018 à 14h46", true)
            .addField("à savoir", "Si vous cliquez sur [PZH Codage](https://www.youtube.com/c/pzhcodage), cela vous redirigera sur sa chaîne YouTube", true)
            .setColor("0xE74C3C")
            .addField("Apprend à coder un bot discord !", "Suivez les tuto de [PZH Codage](https://www.youtube.com/c/pzhcodage) sur sa chaîne youtube !", true)
            .setFooter("Toute ressemblance avec un autre bot serait qu'une pure coïncidence. Bon moment parmis la PZH's Community")
        message.channel.sendEmbed(embed);
    }

    bot.on('guildMemberAdd', member => {
        var role = member.guild.roles.find('name', 'Membre');
        member.addRole(role)
})}})
