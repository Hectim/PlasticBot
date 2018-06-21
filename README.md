# PlasticBot
Twitch bot with ability to tell jokes and look up Runescape stats and ge prices.

# Features
|Commands|Example|Description|
|--------|-------|-----------|
|!commands|!commands|shows available commands|
|!joke|!joke|tells a random one-liner joke (can't promise it will be funny)|
|!death|!death|spits out a random OSHA workplace fatality from '09 - '14|
|!who|!who|displays the current user (defined in config.js)|
|!skill name|!skill smith|displays the player's level, xp, and rank for a skill|
|!ge name/id|!ge raw rocktail|displays ge price and daily change for item|

# Installation
##### [npm](https://www.npmjs.com/) must be installed
* Download zip or clone repo.
* Run "npm install" from the command line
* Edit config.js with your RSN/Twitch
* Create account.js file (see below)
* Run "npm start" from the command line

Twitch bots require Twitch accounts. Go to Twitch, make an account, and get the oauth key. Then create a file called account.js in the same directory as the other files. It should look like this (but with your own info):
```javascript
var account = {
  username: "TwitchBotAccount",
  password: "oauth:4k3ij32lk23oij4lk52oij32"
}
module.exports = account
```
