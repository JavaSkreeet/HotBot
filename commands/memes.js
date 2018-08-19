const Discord = require("discord.js");      //Discord Client
const randomPuppy = require('random-puppy');//random-puppy API to fetch URL of random images from particulkar subreddit

module.exports.run = async (bot,message,args) => {
    
    //Fetching memes from /r/dankmemes subreddit
    randomPuppy('dankmemes')
    .then(url => {
        //Finding channel memes
        let mchan = message.guild.channels.find(`name`,"memes");
        if(!mchan) return message.channel.send("Couldn't find #memes");

        //give bot admin privelages for this to work
        //deleting request and printing the URL
        message.delete().catch(O_o=>{});
        mchan.send(`${url}`);
        return;
        
        /*
        Thanks to integration between imgur and Discord, we can just upload an imgur image URL
        and Discord will display the image without any hassles thus saving the need for a
        download and reuploading the same image into server
        */
    })
}

//Properties
module.exports.help = {
    name:"memes"
}
