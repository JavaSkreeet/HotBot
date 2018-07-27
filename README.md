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
!say <message>
!botinfo
!serverinfo
!headpat
!memes
!yt play <YT URL>
!tempmute @memeber <time>
!kick @member
!ban @member
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


