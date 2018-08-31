const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.reply("Sorry, You aren't authorised to do that");

    let rMem=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));

    if(!rMem)
        return message.reply("Are you sure that guy is on the server?");

    let role = args.join(" ").slice(22);

    if(!role)
        return message.reply("Can't assign that guy nothing");

    let gRole = message.guild.roles.find("name",roll);

    if(!gRole)
        return message.reply("Are you sure that role exists?");

    if(rMem.roles.has(gRole.id)) return;
    await(rMem.addRole(gRole.id));

    try{
        await rMem.send(`Congratulations, you have earned yourself the role ${gRole.namme}`);
    }catch(e){
        message.channel.send(`Congratulations <@${rMem.id} on getting the role ${gRole.name}`);
    }
}

module.exports.help = {
    name:"addroll"
}