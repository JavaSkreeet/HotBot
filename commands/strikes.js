const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json","utf8"));

module.exports.run = async (bot,message,args) => {

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser){
        return message.reply("Couldn't find him in the server");
    }

    if(!warns(wUSer.id)){
      return message.reply(`There are no strikes against <@${wUSer.id}>`);
    }
    else{
      return message.reply(`<@${wUSer.id}> has ${warns(wUSer.id)} strikes against him`);
    }
}

module.exports.help = {
    name: "strikes"
}
