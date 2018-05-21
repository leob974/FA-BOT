const Discord = require ("discord.js");
const newUsers = [];
var client = new Discord.Client();

const queue = new Map();

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16)
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

    if(message.content === '!ping') {
        message.react("✅");
        message.channel.sendMessage("Pong ! Le bot a actuellement une latence de `\" + bot.ping + \" ms !`")
    }

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

bot.login(process.env.BOT_TOKEN);
