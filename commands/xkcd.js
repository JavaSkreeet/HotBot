const Discord = require("discord.js");  //Discord API
const xkcd=require("xkcd");             //xkcd extractor

module.exports.run = async (bot,message,args) => {
    //Looking at the needs of the request
    if(arg=="latest"){
        //Returning the latest one
        xkcd(function (data) {
            return message.channel.send(data.img);
            //.png format image URL
          });
    }
    else if(typeof(arg)=="number"){
        //specific number
        xkcd(arg,function (data) {
            if(!data){
                return message.channel.send("You haven't mentioned correct xkcd number");
            }
            return message.channel.send(data.img);
            //.png image URL
          });
    }
}

//Properties
module.exports.help = {
    name:"xkcd"
}

/*
Thanks to the way Discord handles image URL
We are able to print the image URL and
Discord will do the rest by showing the preview of
the image which saves us a lot off hassles of downloading
and reuploading the requested image
*/
