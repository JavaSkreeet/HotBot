const Discord = require("discord.js");  //Discord Js Client

module.exports.run = async (bot,message,args) => {
    //Checking if the requesting user has permissions
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.reply("Sorry, You aren't authorised to do that");
    //Fetching the user whose role is to be removed
    let rMem=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    //Checking if there is any mentions
    if(!rMem)
        return message.reply("Are you sure that guy is on the server?");
    //Getting the role
    let role = args.join(" ").slice(22);
    //Checkin if there is any role mentioned
    if(!role)
        return message.reply("Can't remove nothing");
    //Finding whether the mentioned role exists in the server
    let gRole = message.guild.roles.find("name",roll);
    //Replying back appropriately
    if(!gRole)
        return message.reply("Are you sure that role exists?");
    //Checking if the member currently has the role
    if(!rMem.roles.has(gRole.id)) return;
    await(rMem.removeRole(gRole.id));
    //Sending a DM else sending it on server
    //User can opt to not recieve DM in discord, this can throw an exception
    try{
        await rMem.send(`I am very sorry to inform that you have lost the role ${gRole.namme}`);
    }catch(e){
        message.channel.send(`<@${rMem.id} is no longer a ${gRole.name}`);
    }
}

//Properties
module.exports.help = {
    name:"remroll"
}
