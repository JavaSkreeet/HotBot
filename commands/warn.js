const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));

module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MEMEBERS")){
        return message.reply("You aren't authorised to do that");
    }

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser){
        return message.reply("Couldn't find him in the server");
    }

    if(wUser.hasPermission("MANAGE_MESSAGES")){
        return message.reply("This is beyound your paygrade");
    }

    let reason = args.join(" ").slice(22);
    if(!warns(wUSer.id)){
        warns[wUser.id] = {
            warns: 0
        };
    }

    warns[wUser.id].warns++;
    fs.writeFile("./warnings.json",JSON.stringify(warns),(err) => {
        if(err){
            console.log(err);
        }
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("WARN")
    .setAuthor(message.author.username)
    .setColor("#000000")
    .addField("Warned User:",`<@${wUser.tag}>`)
    .addField("Warned in", message.channel)
    .addField("Warnings:",warns[wUser.id].warns)
    .addField("Reason:",reason);

    let wChan = message.guild.channel.find("name","incidents");
    if(!wChan){
        return message.send("Could't find the channel #incidents");
    }

    wChan.send(warnEmbed);

    if(warns[wUser.id].warns == 3){
        let muteRole = message.guild.roles.find("name","muted");
        if(!muteRole){
            message.reply("No mute role found");
        }

        let muteTime = "1h";
        await(wUser.addRole(muteRole));
        message.reply(`<@${wUser.tag}> has been temporarily muted`);

        setTimeout(function(){
            wUser.removeRole(muteRole.id);
            message.reply(`<@${wUser.id} has been unmuted>`);
        }, ms(muteTime));
    }
    if(warns[wUser.id].warns==9){
        message.guild.member(wUser).kick(reason);
        wChan.send(`<@${wUser.tag}> has been banned`);
    }
}

module.exports.help = {
    name: "warn"
}