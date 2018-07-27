const Discord = require("discord.js");
const YTDL = require("ytdl-core");

module.exports.run = async (bot,message,args) => {

    let cmd = args[0];
    let arg = args[1];

    var servers = {};
    
    function play(connection,message){
        var server = servers[message.guild.id];
        server.dispacher = connection.playStream(YTDL(server.queue[0],{filter: "audioonly"}));
        server.queue.shift();

        server.dispacher.on("end",function(){
            if(server.queue[0]) play(connection,message);
            else connection.disconnect();
        });
    }

    if(cmd === "play"){

        if(!arg){
            message.channel.send("Please provide the video link (^_^)");
            return;
        }
         
        if(!message.member.voiceChannel){
            message.channel.send("You must be in  a voice channel (^_^)");
            return;   
        }
    
        if(!servers[message.guild.id])
            servers[message.guild.id] = {
                queue: []
            }
    
        var server = servers[message.guild.id];
        server.queue.push(arg);
        message.delete().catch(O_o=>{});
    
    
        if(!message.guild.voiceConnection){
            message.member.voiceChannel.join()
            .then(function(connection){
                play(connection,message);
            });
        }      
    }
    else if(cmd === "stop"){
        var server = servers[message.guild.id];
        message.delete().catch(O_o=>{});
        if(message.guild.voiceConnection)
            message.guild.voiceConnection.disconnect();
    }
}

module.exports.help ={      
    name:"yt"
}

