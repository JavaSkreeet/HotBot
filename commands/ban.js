const Discord = require("discord.js");  //discord client

module.exports.run = async (bot,message,args) => { 
    //async function to process incomming ban requests
    
    //checking for user
    let bUser=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user");   
    //finding the unique 22 character long user id
    let bRes=args.join(" ").slice(22);
    
    //checking if the banner has permissions
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.channel.send("You can't ban a member without permission");
    
    //checking if guy getting banned has special roles
    if(bUser.hasPermission("MANAGE_MEMBERS"))
        return message.channel.send("The user cannot be banned");
    
    //Embedded ban message
    let banembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#c6002e")
    .addField("Banned User",`${bUser} with ID: ${bUsed.id}`)
    .addField("Banned By",`<@${message.author.id}> with ID:${message.author.id}`)
    .addField("Messaged Channel",message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason",bRes);
    
    //printing the even in #incidents
    let bchan = message.guild.channels.find(`name`,"incidents");
    if(!bchan) return message.channel.send("Couldn't find #incidents");

    //give bot admin privelages for this to work
    //deleting the request and banning the user
    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bRes);
    bchan.send(banembed);
    return;
}

//properties
module.exports.help = {
    name:"ban"
}
