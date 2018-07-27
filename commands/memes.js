const Discord = require("discord.js");
const randomPuppy = require('random-puppy');//random-puppy API to fetch URL of random images from particulkar subreddit

module.exports.run = async (bot,message,args) => {
    randomPuppy('dankmemes')
    .then(url => {
        let mchan = message.guild.channels.find(`name`,"memes");
        if(!mchan) return message.channel.send("Couldn't find #memes");

        //give bot admin privelages for this to work
        message.delete().catch(O_o=>{});
        mchan.send(`${url}`);
        return;
    })
}

module.exports.help = {
    name:"memes"
}