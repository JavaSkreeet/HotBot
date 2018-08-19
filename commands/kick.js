const Discord = require("discord.js");  //Discord Client

module.exports.run = async (bot,message,args) => {
    //Finding the user being kicked
    let kUser=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user");
    let kRes=args.join(" ").slice(22);//Getting user's unique 22 digit id
    
    //Checking permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("You don't have permission for this action");

    if(kUser.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("User can't be kicked");
    
    //Embeded kick message
    let kickembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#c6002e")
    .addField("Kicked User",`${kUser} with ID: ${kUsed.id}`)
    .addField("Kicked By",`<@${message.author.id}> with ID:${message.author.id}`)
    .addField("Messaged Channel",message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason",kRes);
    
    //Finding incidents channel 
    let kchan = message.guild.channels.find(`name`,"incidents");
    if(!kchan) return message.channel.send("Couldn't find #incidents");

    //give bot admin privelages for this to work
    //Printing the banning message in incidents
    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kRes);
    kchan.send(kickembed);
    return;
}

//Properties
module.exports.help = {
    name:"kick"
}
