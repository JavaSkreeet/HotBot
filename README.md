# HotBot
A Discord Bot for Servers filled with Programming Enthusiasts

### Dependencies
The following packages are required for smooth function of the bot:
* [Discord.js](https://discord.js.org/#/) - Discord Library for JavaScript
* [random-puppy](https://www.npmjs.com/package/random-puppy) - Library to fetch random URl of images from Reddit
* [ytdl-core](https://www.npmjs.com/package/ytdl-core) - Library to load YT music in audio channel
* [opusscript](https://www.npmjs.com/package/opusscript) - Library to load YT music in audio channel

### Commands
```
!say <message>              //Replies back with the message
!botinfo                    //Returns Information about the bot
!serverinfo                 //Returns information about the server
!headpat                    //Returns URL of a random image from /r/headpats
!memes                      //Returns URL of random meme from /r/dankmemes
!yt play <YT URL>           //Plays the audio from the mentioned Youtube URL
!tempmute @memeber <time>   //Mute a player for a given period of time
!kick @member               //kick a member from the server
!ban @member                //ban a member from the server
```

### Running The Bot
```
$ npm update
$ node index.js
```
The Bot is modified to run on Heroku. In order to run it on your local machine replace:
```
process.env.BOT_TOKEN
```
in line 14 of index.js with your unique Discord Bot token.

# Cheers!


