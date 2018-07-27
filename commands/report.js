const Discord = require("discord.js");

module.exports.run = async (bot,message,args) =>{
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user");

        let reason = args.join(" ").slice(22);

        let reportembed=new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#c6002e")
        .addField("Reported User",`${rUser} with ID: ${rUder.id}`)
        .addField("Reported By",`${message.author} with ID: ${message.author.id}`)
        .addField("Time",message.createdAt)
        .addField("Reason",reason);


        let repchan = message.guild.channels.find(`name`,"reports");
        if(!repchan) return message.channel.send("Couldn't find #reports");

        //give bot admin privelages for this to work
        message.delete().catch(O_o=>{});
        repchan.send(reportembed);
}

module.exports.help = {
    name:"report"
}