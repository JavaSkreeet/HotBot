const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.reply("Sorry, You aren't authorised to do that");

    let rMem=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));

    if(!rMem)
        return message.reply("Are you sure that guy is on the server?");

    let role = args.join(" ").slice(22);

    if(!role)
        return message.reply("Can't remove nothing");

    let gRole = message.guild.roles.find("name",roll);

    if(!gRole)
        return message.reply("Are you sure that role exists?");

    if(!rMem.roles.has(gRole.id)) return;
    await(rMem.removeRole(gRole.id));

    try{
        await rMem.send(`I am very sorry to inform that you have lost the role ${gRole.namme}`);
    }catch(e){
        message.channel.send(`<@${rMem.id} is no longer a ${gRole.name}`);
    }
}

module.exports.help = {
    name:"remroll"
}