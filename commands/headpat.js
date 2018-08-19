const Discord = require("discord.js");      //Discord Client
const randomPuppy = require('random-puppy');//random-puppy API to fetch URL of random images from particular subreddit

module.exports.run = async (bot,message,args) => {  
    //Getting image URL from subreddit /r/headpats
    randomPuppy('headpats')
    .then(url => {
        //Finding channel headpat
        let hpchan = message.guild.channels.find(`name`,"headpat");
        if(!hpchan) return message.channel.send("Couldn't find #headpat");

        //give bot admin privelages for this to work
        //Deleting the message and printing the image URL
        message.delete().catch(O_o=>{});
        hpchan.send(`${url}`);
        return;
        
        //Due to integration with imgur.com in Discord an imgur image URL will show the
        //photo preview in the chat and hence saves the hassle of downloading and reuploading
    })
}

//Properties
module.exports.help = {
    name:"headpat"
}

//!headpat function based on sbot made by Raylu
