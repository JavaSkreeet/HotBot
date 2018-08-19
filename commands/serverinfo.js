const Discord = require("discord.js");  //Discord Client

module.exports.run = async (bot,message,args) => {
    
    //Getting the server icon as URL
    let sicon = message.guild.iconURL;
    
    //Embeded message with server info
    let serverembed=new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#c6002e")
    .setThumbnail(sicon)
    .addField("Sever Name",message.guild.name)
    .addField("Created On",message.guild.createdAt)
    .addField("You Joined",message.member.joinedAt)
    .addField("Total Members",message.guild.memberCount);
    
    //Returning the server info to chat
    return message.channel.send(serverembed);
}

//Properties
module.exports.help = {
    name:"serverinfo"
}
