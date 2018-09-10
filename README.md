# MEANBOT
A Discord Bot for Servers filled with Programming Enthusiasts and Nerds with a little twist for anime lovers and the contemporary teens who can't live without their memes.

### Dependencies
The following packages are required for smooth function of the bot:
* [Discord.js](https://discord.js.org/#/) - Discord Library for JavaScript
* [random-puppy](https://www.npmjs.com/package/random-puppy) - Library to fetch random URl of images from Reddit
* [ms](https://www.npmjs.com/package/ms) - Library to mange time for temporary muting
* [ytdl-core](https://www.npmjs.com/package/ytdl-core) - Library to load YT music in audio channel
* [opusscript](https://www.npmjs.com/package/opusscript) - Library to load YT music in audio channel
* [node-ytsr](https://www.npmjs.com/package/ytsr) - Library to search for video URL based on the name
* [xkcd](https://www.npmjs.com/package/xkcd) - Library to get you your addictive xkcd comics right into the server

### Commands
```
!say <message>              //Replies back with the message
!botinfo                    //Returns Information about the bot
!serverinfo                 //Returns information about the server
!headpat                    //Returns URL of a random image from /r/headpats
!memes                      //Returns URL of random meme from /r/dankmemes
!yt play <YT URL>           //Plays the audio from the mentioned Youtube URL
!yt skip                    //Skips the current playing track
!yt stop                    //Stops the song
!yt search <name>           //Gives back an I'm feeling lucky URL for video best linked with the given search query
!yt splay <name>            //Gives the most relevant video linked to search query <name> from YT
!tempmute @memeber <time>   //Mute a player for a given period of time
!kick @member               //kick a member from the server
!ban @member                //ban a member from the server
!xkcd                       //Lets you read the latest XKCD comic strip
!xkcd <num>                 //Brings you the specific XKCD comic
```

### Running The Bot
```
$ npm update
$ node index.js
```
In order to run the bot add your Personalized Bot Token to botconfig.json

### Contribution

All contributions are welcome as long as you love tabs over spaces.
Use the template.js present in HotBot/commands/ as the strating point for adding new commands.
Any new commands must be comitted to HotBot/commands/ and follow the instructions commented in template.js

### Inspiration

Loosely based on Hotbot made by [Fox](https://gitlab.com/Aberrantfox) for [The Programmers Hangout](https://discordapp.com/invite/HR229U) Discord server

Shout Out to [Raylu](https://github.com/raylu) for coming up with the idea for !headpat feature,an eyecandy for all anime lovers.
                message.channel.send("You must be in  a voice channel (^_^)");
Check out the [Python Bot](https://github.com/raylu/sbot) by Raylu, the repository where idea of !headpat was born.

### Deployment
We finally settled for [glitch.com](https://glitch.com/) for hosting our bot. Everything works including the !yt command which was previously giving us trouble on Heroku.
For more information, head over to [glitch](https://github.com/flowkraD/MeanBot/tree/glitch) brach to know about deployment
Also be sure to read this [useful article](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/other-guides/hosting-on-glitchcom.html) on Glitch hosting before jumping in (^_^)

### Cheers
