const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    let bicon= bot.user.displayAvatarURL;//extracts vot img as url
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#c6002e")
    .setThumbnail(bicon)
    .addField("Bot Name",bot.user.username)
    .addField("Created On",bot.user.createdAt);

    message.delete().catch(O_o=>{});

    return message.channel.send(botembed);
}

module.exports.help = {
    name:"botinfo"
}