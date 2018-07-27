const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    let bUser=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user");
    let bRes=args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_ME"))
        return message.channel.send("Aukaat Mein Rai Bhadvey");

    if(bUser.hasPermission("MANAGE_MEMBERS"))
        return message.channel.send("Dost Se gaddari Bancho?");

    let banembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#c6002e")
    .addField("Banned User",`${bUser} with ID: ${bUsed.id}`)
    .addField("Banned By",`<@${message.author.id}> with ID:${message.author.id}`)
    .addField("Messaged Channel",message.channel)
    .addField("Time",message.createdAt)
    .addField("Reason",bRes);
    

    let bchan = message.guild.channels.find(`name`,"incidents");
    if(!bchan) return message.channel.send("Couldn't find #incidents");

    //give bot admin privelages for this to work
    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bRes);
    bchan.send(banembed);
    return;
}

module.exports.help = {
    name:"ban"
}