const Discord = require("discord.js");                              //Discord Js Library
const fs = require("fs");                                           //File system to access the warning count
const ms = require("ms");                                           //Sets time for temporary muting
let warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));  //json file containing warning count

module.exports.run = async (bot,message,args) => {
    //Checking for permissions
    if(!message.member.hasPermission("MANAGE_MEMEBERS")){
        return message.reply("You aren't authorised to do that");
    }
    //Getting the mentioned user
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser){
        return message.reply("Couldn't find him in the server");
    }
    //Checking for the warned user's permissions
    if(wUser.hasPermission("MANAGE_MESSAGES")){
        return message.reply("This is beyound your paygrade");
    }
    //Fetching the reason 
    let reason = args.join(" ").slice(22);
    //Checking if there are any previous warnings. IF not, creating new ID for the user
    if(!warns(wUSer.id)){
        warns[wUser.id] = {
            warns: 0
        };
    }
    //Increasing the warn count
    warns[wUser.id].warns++;
    fs.writeFile("./warnings.json",JSON.stringify(warns),(err) => {
        if(err){
            console.log(err);
        }
    });
    //Displaying the message of warning
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("WARN")
    .setAuthor(message.author.username)
    .setColor("#000000")
    .addField("Warned User:",`<@${wUser.tag}>`)
    .addField("Warned in", message.channel)
    .addField("Warnings:",warns[wUser.id].warns)
    .addField("Reason:",reason);
    //Posting in #incidents
    let wChan = message.guild.channel.find("name","incidents");
    if(!wChan){
        return message.send("Could't find the channel #incidents");
    }

    wChan.send(warnEmbed);
    //Taking actions for more than one warning
    if(warns[wUser.id].warns == 3){
        let muteRole = message.guild.roles.find("name","muted");
        if(!muteRole){
            message.reply("No mute role found");
        }
        //Muting the user
        let muteTime = "1h";
        await(wUser.addRole(muteRole));
        message.reply(`<@${wUser.tag}> has been temporarily muted`);

        setTimeout(function(){
            wUser.removeRole(muteRole.id);
            message.reply(`<@${wUser.id} has been unmuted>`);
        }, ms(muteTime));
    }
    if(warns[wUser.id].warns==9){
        //Kicking for repeated breaking of rules
        message.guild.member(wUser).kick(reason);
        wChan.send(`<@${wUser.tag}> has been banned`);
    }
}

//Properties
module.exports.help = {
    name: "warn"
}
