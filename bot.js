const Discord = require("discord.js");
const PREFIX = "FA!";
const EVERYONE = "@";
const newUsers = [];
var client = new Discord.Client();

const queue = new Map();

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function () {
    var games = [
        "FA-BOT 1.0",
        "FrenchArts <3",
        "Dev par Leob974",
        "" + new Date(),
        bot.users.size + " visiteurs !"
    ]
    bot.user.setActivity(setInterval(function () {
        bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/FrenchArts", type: "STREAMING"})
    }, 3000))

    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
    console.log("-_-_- FA-BOT -> Connecté -_-_-")
    console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-")
});

bot.on('message', function (message) {

    if(message.content === 'fdp') {
        message.delete();
        message.reply('Pas de ça ici !')
    }

    if(message.content === 'ntm') {
        message.delete();
        message.reply('On avait dit pas les mamans !')
    }

    if(message.content === 'bite') {
        message.delete();
        message.channel.sendMessage("Ce salon n'est pas destiné aux organes sexuels!")
    }

    if(message.content === 'pute') {
        message.delete();
        message.channel.sendMessage("One ne dit pas ça, on dit Madame travaille!")
    }

    if(message.content === 'sa va') {
        message.channel.sendMessage("Ouep")
    }

    if(message.content === 'salut') {
        message.channel.sendMessage('Bonsoir !')
    }
    if(message.content === 'Qui est la') {
        message.channel.sendMessage("Toujours au rapport !")
    }
    if(message.content === 'Bye') {
        message.channel.sendMessage(':cry:')
    }
    if(message.content === 'bye') {
        message.channel.sendMessage(':cry:')
    }
    if(message.content === 'wsh') {
        message.channel.sendMessage('wesh wesh')
    }

});

bot.on("guildMemberAdd", function(member) {
    member.addRole(member.guild.roles.find("name", "❌ VISITEUR"));
    var games = [
        "FA-BOT 1.0",
        "FrenchArts <3",
        "Dev par Leob974",
        "" + new Date(),
        bot.users.size + " visiteurs !"
    ]
    bot.user.setActivity(setInterval(function() {
        bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/FrenchArts", type: "STREAMING"})
    }, 3000))

    member.guild.channels.find("name", "bienvenue👋").sendMessage("", {
        embed: {
            color: 0x008000,
            author: '',
            title: '',
            description: '',
            fields: [
                {
                    name: member.displayName,
                    value: 'a rejoint :heart:  ',
                    inline: false
                }],
            footer: {
                text: 'Bienvenue sur FrenchArts !',
            },
        }
    });
});

bot.on("guildMemberRemove", function(member) {

    var games = [
        "FA-BOT 1.0",
        "FrenchArts <3",
        "Dev par Leob974",
        "" + new Date(),
        bot.users.size + " visiteurs !"
    ]
    bot.user.setActivity(setInterval(function() {
        bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/FrenchArts", type: "STREAMING"})
    }, 3000))

    member.guild.channels.find("name", "bienvenue👋").sendMessage("", {
        embed: {
            color: 0xFF0000,
            author: '',
            title: '',
            description: '',
            fields: [
                {
                    name: member.displayName,
                    value: 'a quitté le serveur :cry:',
                    inline: false
                }],
            footer: {
                text: 'Une grande perte... Ou pas',
            },
        }
    });

});


bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");

    var reasontimed = args2.slice(2).join(' ')


    var user = message.mentions.users.first();

    var guild = message.guild;

    var member = message.member;

    var roleJoueur= member.guild.roles.find("name", "❌ VISITEUR")

    var roleMute = member.guild.roles.find("name", "MUTE")

    var modlog = member.guild.channels.find("name", "log")

    var user = message.mentions.users.first();

    const serverQueue = queue.get(message.guild.id);

    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

    switch (args[0].toLowerCase()) {
        case "membres":
            message.channel.send("", {
                embed: {
                    color: 0xFF0000,
                    author:  message.author.name,
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: "Voici le nombre d'utilisateurs sur le discord !",
                            value: bot.users.size + '',
                            inline: false
                        }],
                    footer: {
                        text: '',
                    },
                }
            });
            message.react("✅")
            break
        case "unmute":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas les permissions suffisantes pour pouvoir unmute.");
            if(!modlog) return message.reply("Je ne trouve pas de channel de logs.");
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("Tu ne m'a pas précisé qui je dois démute.")
            member.removeRole(roleMute)
            message.channel.sendMessage(user.toString() + " a bien été démute.")

            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Démute")
                .addField("Pour qui :", user.username)
                .addField("Par qui :", message.author.username)
                .addField("À quelle heure :", message.channel.createdAt)
                .setColor("#00FF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);

            user.send("" , {
                embed: {
                    color: 0x00FF00,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "Vous avez été **démute**",
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });

            message.channel.sendMessage("" , {
                embed: {
                    color: 0x00BFFF,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "a bien été démute",
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;

        case "mute":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission.");
            if(!modlog) return message.reply("Je ne trouve pas de channel de logs.");
            let time = parseInt(args2[1]) * 60000;
            if(!time) return message.reply("Tu as oublié combien de temps je dois le mute.")
            if (!reasontimed) return message.reply("Tu as oublié la raison pour laquelle je dois mute cet utilisateur.")
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("Tu ne m'as pas précisé qui je dois mute.")
            message.channel.sendMessage(member.toString() + " a bien été mute.")
            member.addRole(roleMute)
            setTimeout(() => { member.removeRole(roleMute); }, time);

            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Mute")
                .addField("Pour qui :", user.toString())
                .addField("Par qui :", message.author.toString())
                .addField("Pourquoi :", reasontimed)
                .addField("Pour combien de temps :", args2[1] + " minute(s)")
                .setColor(0xFF7B00)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            user.send("" , {
                embed: {
                    color: 0xFF7B00,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "Vous avez été mute " + args2[1] + " minute(s) pour:" + reasontimed,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });

            message.channel.sendMessage("" , {
                embed: {
                    color: 0xFF7B00,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "a bien été mute " + args2[1] + " minute(s) pour : " + reasontimed,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .addField("FA!ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites FA!ban @(utilisateur) (raison)")
                .addField("FA!kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites FA!kick @(utilisateur) (raison)")
                .addField("FA!clear", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites FA!clear (nombredemessages)")
                .addField("FA!mute", "Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites FA!mute @(utilisateur) (temps) (raison)")
                .addField("FA!unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites FA!unmute @(utilisateur)")
                .addField("FA!ping", "Grâce à cette commande, tu pourras savoir ton ping ! -> bot.ping")
                .setColor("#01A9DB")
                .setFooter("C'est déjà pas mal !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du bot !")
                .setTimestamp()
            message.delete()
            message.channel.sendEmbed(embed);
            break;
        case "Roll":
            break;
        case "kick":

            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel de logs.");
            if (reason.length < 1) return message.reply("Tu ne m'a pas précisé la raison pour laquelle je dois le/la kick.");
            if (message.mentions.users.size < 1) return message.reply("Tu ne m'as pas précisé qui je dois kick ! :o")
            message.guild.member(user).kick();
            message.channel.send(user.toString() + " a bien été kick.")

            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Kick")
                .addField("Pour qui :", user.username)
                .addField("Par qui :", message.author.username)
                .addField("Pourquoi : ", reason)
                .addField("Quand :", message.channel.createdAt)
                .setColor("#0800FF")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);381242462053728267
            bot.channels.get('387078781866606593').sendMessage("L'utilisateur " + user.username + " à bien été kick pour: " + reason);
            user.send("" , {
                embed: {
                    color: 0x0800FF,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "Vous avez été kick pour:" + reason,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });

            message.channel.sendMessage("" , {
                embed: {
                    color: 0x00BFFF,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "a bien été kick pour:" + reason,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;
        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu n'as pas les permissions suffisantes pour effectuer cette commande.");
            if(!modlog) return message.reply("Je ne trouve pas de channel de logs.");
            if (reason.length < 1) return message.reply("Tu ne m'a pas précisé la raison pour laquelle je dois le/la bannir.");
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de me préciser qui je dois bannir...")

            message.guild.ban(user, 2);
            message.channel.send(user.toString() + " a bien été banni.")

            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Bannissement")
                .addField("Pour Qui :", user.username)
                .addField("Par qui :", message.author.username)
                .addField("Pourquoi : ", reason)
                .addField("Quand :", message.channel.createdAt)
                .setColor("#FF0000")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);

            bot.channels.get('387078781866606593').sendMessage("Le joueur " + user.username + " à bien été banni pour: " + reason);
            user.send("" , {
                embed: {
                    color: 0xFF0000,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "Vous avez été banni pour:" + reason,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });

            message.channel.sendMessage("" , {
                embed: {
                    color: 0xFF0000,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "a bien été banni pour:" + reason,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;

        case "warn":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas les permissions suffisantes pour exécuter cette commande.");
            if(!modlog) return message.reply("Je ne trouve pas de channel de logs.");
            if (reason.length < 1) return message.reply("Tu as oublié la raison pour laquelle je dois l'avertir.");
            if (message.mentions.users.size < 1) return message.reply("Tu ne m'a pas précisé qui je dois bannir.")


            message.channel.send(user.toString() + " a bien été averti.")

            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Avertissement")
                .addField("Pour qui :", user.username)
                .addField("Par qui :", message.author.username)
                .addField("Pourquoi : ", reason)
                .addField("Quand :", message.channel.createdAt)
                .setColor("#00ff4c")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);

            bot.channels.get('387078781866606593').sendMessage("Le joueur " + user.username + " à été averti pour: " + reason);
            message.author.send("Vous avez été averti pour: **`" + reason + "** Si vous continuez, vous risquez de vous faire bannir...");

            message.channel.sendMessage("" , {
                embed: {
                    color: 0x00BFFF,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: user.username,
                            value: "a bien été averti pour:" + reason,
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;
        case "clear":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas les permissions suffisantes pour exécuter cette commande.");
            var messagecount = parseInt(args2.join(" "));
            if(!messagecount) return message.channel.send("Tu as oublié de me préciser combien de messages je dois supprimer.")
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
            message.delete()
            var embed = new Discord.RichEmbed()
                .addField("Commande effectuée :", "Clear")
                .addField("Par qui :", message.author.username)
                .addField("Combien de messages :", messagecount)
                .addField("Quand :", message.channel.createdAt)
                .setColor("#00ffe9")
                .setFooter("🌬️💨")
            message.delete()
            member.guild.channels.find("name", "log").sendEmbed(embed);

            message.channel.sendMessage("" , {
                embed: {
                    color: 0x00ffe9,
                    author: '',
                    title: '',
                    description: '',
                    fields: [
                        {
                            name: messagecount,
                            value: " messages ont été effacés",
                            inline: false
                        }],
                    footer: {
                        text: "Le " + message.channel.createdAt,
                    },
                }
            });
            message.react("✅")
            break;;

        case "ping":
            message.channel.sendMessage("Pong! Le bot a actuellement " + bot.ping + " ms ! :D");
            message.delete();
            break;
        //INSCRIPTION-CONNEXION SYSTEME


        case "inscription":

            break;

        case "connexion":

            break;


            message.channel.sendMessage("Commande invalide ^^ Fait FA!help pour voir toutes les commandes disponibles !")
    }
});



bot.login('BOT_LOGIN');
