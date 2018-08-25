const botconf = require("./botconfig.json");//Consists of the prefix and bot token
const Discord = require("discord.js");      //Discord Library
const fs = require("fs");                   //File System to access the bot commands
const ytdl = require("ytdl-core");          //To fetch music stream from Youtube
const ytsr = require("ytsr");               //YTSR is the library that fetches Youtube URL request based on search queries

const bot = new Discord.Client();           //Creating a bot client
bot.commands = new Discord.Collection();    
bot.login(process.env.TOKEN);                   //Authorising the bot with the access token

//Reding the files in ./commands/ usinf fs
fs.readdir("./commands/",(err,file)=>{
    if(err) console.log(err);
    let jsfile = file.filter(f => f.split(".").pop()==="js")
    if(jsfile.length <=0){//file length cannot be zero for already programmed commands
        console.log("Couldn't find commands");
        return;
    }
    //fetching each command file and signalling the file is ready to use
    jsfile.forEach((f,i) => {
        let props=require(`./commands/${f}`);
        console.log(`${f} loded`);
        bot.commands.set(props.help.name, props);
          
    });
});

//Logging bot is online and setting the status of PLAYING with .vimrc in Discord
bot.on("ready",async ()=>{
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("with .vimrc",{type: "PLAYING"});
});

var servers = {};//Server Queue

//Function to play the YT music stream in the voice channel
function play(connection,message){
    var server = servers[message.guild.id];//finding the right server request
    //Dispaching the audio stream to voice channel
    server.dispacher = connection.playStream(ytdl(server.queue[0],{filter: "audioonly",quality:"highestaudio"}));
    server.queue.shift();//Removing the current URL
    
    //Checking if there are any more songs to play else end dispaching
    server.dispacher.on("end",function(){
    if(server.queue[0]) play(connection,message);
    else connection.disconnect();
    });
}

//Reading messages
bot.on("message",async message =>{
    
    //ignoring bots and DM
    if(message.author.bot)return;
    if(message.channel.type === "dm") return;
    
    //taking the message and splitting it as command and parameter
    let prefix = botconf.prefix;
    let messageArr = message.content.split(" ");
    let cmd = messageArr[0];
    let args = messageArr.slice(1);   
    // Above splits the commands as !<cmd> <args>
    
    //Checking for !yt command
    if(cmd === `${prefix}yt` && message.channel.name === "music" && message.channel.type === "text"){
        //Getting command and video URL
        let cmds = args[0];
        let arg = args[1];
    
        if(cmds === "play"){
            //Play Command
            //Checking if URL exists
            if(!arg){
                message.channel.send("Please provide the video link (^_^)");
                return;
            }
            //Checking for a valid URL
            if(!ytdl.validateURL(arg)){
                message.channel.send("Please provide a valid video link (^_^)");
                return;
            }
            //Checking if user is in an audio channel
            if(!message.member.voiceChannel){
                message.channel.send("You must be in  a voice channel (^_^)");
                return;   
            }
            
            //Adiidng queue for individual channel
            if(!servers[message.guild.id])
                servers[message.guild.id] = {
                    queue: []
                }
            
            //Pushing request into the queue
            var server = servers[message.guild.id];
            server.queue.push(arg);
            message.delete().catch(O_o=>{});//Deleting Requests
        
            //Join the same audio channel to play the music
            if(!message.guild.voiceConnection){
                message.member.voiceChannel.join()
                .then(function(connection){
                    play(connection,message);
                });
            }      
        }
        else if(cmds === "skip"){
            //Skip command
            var server = servers[message.guild.id];
            message.delete().catch(O_o=>{});
            //Goes to end function of dispacher that either plays the next song or terminates if no more requests are pending
            if(server.dispacher)server.dispacher.end();
        }
        else if(cmds === "stop"){
            //stops the stream by disconnecting from voice channel
            var server = servers[message.guild.id];
            message.delete().catch(O_o=>{});
            if(message.guild.voiceConnection)
                message.guild.voiceConnection.disconnect();
        }
        else if(cmds == "search"){
            let filter;//search result
            
            //Checking for existance of sarch query
            if(!arg){
                message.channel.send("I can't search nothing. Please specify the search field (^_^)");
                return;
            }
            
            //Getting URL for the given search query
            ytsr.getFilters(arg, function(err, filters) {
                if(err) throw err;
                
                //Getting a video
                filter = filters.get("Type").find(o => o.name === "Video");
                ytsr.getFilters(filter.ref, function(err, filters) {
                    if(err) throw err;
                    //Filtering the content based on length to stop trolls
                    filter = filters.get("Duration").find(o => o.name.startsWith("Short"));
                    var options = {
                        limit: 2,               //2 because 1 is too mainstream
                        nextpageRef: filter.ref //Getting next page reference
                    }
                    
                    //fetching theURL
                    ytsr(null, options, function(err, searchResults) {
                        if(err) throw err;
                        //Sending the URL to chat
                        message.channel.send(`${searchResults.items[0].link}`);
                    });
                });
            });
        }
    }
    //Due to the seamless integration of Youtube in Discord, just sending the URL will give you the preview 
    //of the video which you csn click on to view
    //Thank you Discord

    //fetching the required command file from command and passing in the necessary parameters
    let commandf=bot.commands.get(cmd.slice(prefix.length));
    if(commandf) commandf.run(bot,message,args);
});
