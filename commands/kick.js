const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    let kUser=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user");
    let kRes=args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("Aukaat Mein Rai Bhadvey");

    if(kUser.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("Dost Se gaddari Bancho?");

    let kickembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#c6002e")
    .addField("Kicked User",`${kUser} with ID: ${kUsed.id}`)
    .addField("Kicked By",`<@${message.author.id}> with ID:${message.author.id}`)
    .addField("Messaged Channel",message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason",kRes);
    
    let kchan = message.guild.channels.find(`name`,"incidents");
    if(!kchan) return message.channel.send("Couldn't find #incidents");

    //give bot admin privelages for this to work
    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kRes);
    kchan.send(kickembed);
    return;
}

module.exports.help = {
    name:"kick"
}