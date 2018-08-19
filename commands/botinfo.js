const Discord = require("discord.js");  //Discord client

module.exports.run = async (bot,message,args) => {
    
    //Extract's Bot's image as URL
    let bicon= bot.user.displayAvatarURL;
    //Embedded message of botinfo
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#c6002e")
    .setThumbnail(bicon)
    .addField("Bot Name",bot.user.username)
    .addField("Created On",bot.user.createdAt);
    
    //deleting the request
    message.delete().catch(O_o=>{});
    //printing the bot info
    return message.channel.send(botembed);
}

//Properties
module.exports.help = {
    name:"botinfo"
}
