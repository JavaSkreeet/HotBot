const botconf = require("./botconfig.json");//Consists of the prefix and bot token
const Discord = require("discord.js");      //Discord Library
const fs = require("fs");                   //File System to access the bot commands
const YTDL = require("ytdl-core");          //To fetch music stream from Youtube

const bot = new Discord.Client();           //Creating a bot client
bot.commands = new Discord.Collection();    
bot.login(botconf.token);                   //Authorising the bot with the access token

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

    //fetching the required command file from command and passing in the necessary parameters
    let commandf=bot.commands.get(cmd.slice(prefix.length));
    if(commandf) commandf.run(bot,message,args);
});
