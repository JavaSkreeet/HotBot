const botconf = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.login(process.env.BOT_TOKEN);

fs.readdir("./commands/",(err,file)=>{
    if(err) console.log(err);
    let jsfile = file.filter(f => f.split(".").pop()==="js")
    if(jsfile.length <=0){
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f,i) => {
        let props=require(`./commands/${f}`);
        console.log(`${f} loded`);
        bot.commands.set(props.help.name, props);
          
    });
});


bot.on("ready",async ()=>{
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("with .vimrc",{type: "PLAYING"});
});

bot.on("message",async message =>{
    
    if(message.author.bot)return;
    if(message.channel.type === "dm") return;

    let prefix = botconf.prefix;
    let messageArr = message.content.split(" ");
    let cmd = messageArr[0];
    let args = messageArr.slice(1);   
    // Above splits the commands as !<cmd> <args>

    let commandf=bot.commands.get(cmd.slice(prefix.length));
    if(commandf) commandf.run(bot,message,args);
});