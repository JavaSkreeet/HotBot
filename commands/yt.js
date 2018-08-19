const Discord = require("discord.js");  //Discord Client
const YTDL = require("ytdl-core");      //Youtube Music Stream Extraction Library

module.exports.run = async (bot,message,args) => {
    
    //Finding command and URL to play
    let cmd = args[0];
    let arg = args[1];

    var servers = {};//Server Queue
    
    function play(connection,message){
        var server = servers[message.guild.id];
        //Dispacher extracts music stream
        server.dispacher = connection.playStream(YTDL(server.queue[0],{filter: "audioonly"}));
        //going to the next in queue
        server.queue.shift();
        
        //stopping dispacher or swiching to next song if any
        server.dispacher.on("end",function(){
            if(server.queue[0]) play(connection,message);
            else connection.disconnect();
        });
    }
    
    //for play command
    if(cmd === "play"){
    //checking if video link exists
        if(!arg){
            message.channel.send("Please provide the video link (^_^)");
            return;
        }
        //Checking if user is there in a voice channel
        if(!message.member.voiceChannel){
            message.channel.send("You must be in  a voice channel (^_^)");
            return;   
        }
        
        //Starting the queue
        if(!servers[message.guild.id])
            servers[message.guild.id] = {
                queue: []
            }
        //Pushing the URL in queue
        var server = servers[message.guild.id];
        server.queue.push(arg);
        message.delete().catch(O_o=>{});
    
        //Joining voice channel
        if(!message.guild.voiceConnection){
            message.member.voiceChannel.join()
            .then(function(connection){
                play(connection,message);
            });
        }      
    }
    else if(cmd === "stop"){
        //stopping the stream 
        var server = servers[message.guild.id];
        message.delete().catch(O_o=>{});
        if(message.guild.voiceConnection)
            message.guild.voiceConnection.disconnect();
    }
}

//Properties
module.exports.help ={      
    name:"yt"
}

