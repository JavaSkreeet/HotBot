const Discord = require("discord.js");
const randomPuppy = require('random-puppy');//random-puppy API to fetch URL of random images from particulkar subreddit

module.exports.run = async (bot,message,args) => {
    randomPuppy('headpats')
    .then(url => {
        let hpchan = message.guild.channels.find(`name`,"headpat");
        if(!hpchan) return message.channel.send("Couldn't find #headpat");

        //give bot admin privelages for this to work
        message.delete().catch(O_o=>{});
        hpchan.send(`${url}`);
        return;
    })
}

module.exports.help = {
    name:"headpat"
}

//!headpat function based on sbot made by Raylu