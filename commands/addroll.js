const Discord = require("discord.js");     //Discord Js Client

module.exports.run = async (bot,message,args) => {
    //Checking if the user has powers to carry the action out
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.reply("Sorry, You aren't authorised to do that");
    //Fetching the USer ID from message
    let rMem=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    //Checking if member exists in the server
    if(!rMem)
        return message.reply("Are you sure that guy is on the server?");
    //Fetching the role
    let role = args.join(" ").slice(22);
    //Checking if role is mentioned
    if(!role)
        return message.reply("Can't assign that guy nothing");
    //Getting the server role
    let gRole = message.guild.roles.find("name",roll);
    //Checking if role exists in server
    if(!gRole)
        return message.reply("Are you sure that role exists?");
    //Checking if the member already has the role
    if(rMem.roles.has(gRole.id)) return;
    await(rMem.addRole(gRole.id));
    //Sending a message to let him know of the achievement
    try{
        await rMem.send(`Congratulations, you have earned yourself the role ${gRole.namme}`);
    }catch(e){
        message.channel.send(`Congratulations <@${rMem.id} on getting the role ${gRole.name}`);
    }
}

//Properties
module.exports.help = {
    name:"addroll"
}
