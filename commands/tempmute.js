const Discord = require("discord.js");  //Discord Client
const ms = require("ms");               //Keeps a track of time for mute

module.exports.run = async (bot,message,args) => {
    
    //Finding user to be muted
    let toMute=message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!toMute) return message.channel.send("Couldn't find user");
    
    //Checking permission
    if(toMute.hasPermission("MANAGE_CHANNELS"))
        return message.reply("You don't have the authority to take this action");
    
    //creating a mute role
    let muteRoll=message.guild.role.find(`name`,"muted");
    
    //checking if mute role exists
    //If not creating it
    if(!muteRoll){
        try{
            muteRoll = await message.guild.createRole({
                name:"muted",
                color:"#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel,id) => {
                await channel.overwritePermissions(muteRoll,{
                    SEND_MESSAGE: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }//Adding all the necessary restrictions
    
    //finding mute time
    let muteTime = args[1];
    if(!muteTime) return message.reply("You didn't specify the time");

    await(toMute.addRole(muteRoll.id));
    
    //Creatinf an embed to display
    let muteembed = new Discord.RichEmbed()
    .setDescription("Mute")
    .setColor("#c6002e")
    .addField("Muted User",`${toMute} with ID: ${toMute.id}`)
    .addField("Banned By",`<@${message.author.id}> with ID:${message.author.id}`)
    .addField("Messaged Channel",message.channel)
    .addField("Time",`${ms(ms(muteTime))}`);
    return;

    //finding channel #incidents
    let mchan = message.guild.channels.find(`name`,"incidents");
    if(!mchan) return message.channel.send("Couldn't find #incidents");

    //give bot admin privelages for this to work
    //Sending the report
    message.delete().catch(O_o=>{});
    kchan.send(muteembed);

    message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);
    
    //timeout to lift mute role after the specific time
    setTimeout(function(){
         toMute.removeRole(muteRoll.id);
         message.channel.send(`<@${toMute.id}> has been unmuted`);
    },ms(muteTime));
}

//Properties
module.exports.help = {
    name:"tempmute"
}
