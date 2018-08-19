const Discord = require("discord.js");

module.exports.run = async (bot,message,args) =>{
        //Finding the reprted User's ID and finding his existance
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user");
        
        //Finding the mentioned reason
        let reason = args.join(" ").slice(22);
        
        //embeded message to report user
        let reportembed=new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#c6002e")
        .addField("Reported User",`${rUser} with ID: ${rUder.id}`)
        .addField("Reported By",`${message.author} with ID: ${message.author.id}`)
        .addField("Time",message.createdAt)
        .addField("Reason",reason);

        //finding #incidents
        let repchan = message.guild.channels.find(`name`,"reports");
        if(!repchan) return message.channel.send("Couldn't find #reports");

        //give bot admin privelages for this to work
        //Deleting the request and sending the report
        message.delete().catch(O_o=>{});
        repchan.send(reportembed);
}

//properties
module.exports.help = {
    name:"report"
}
