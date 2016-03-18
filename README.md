# PlasticBot
Twitch bot with ability to tell jokes and look up Runescape stats and ge prices.

# Usage
* Download zip or clone repo.
* Install npm and run "npm install" from the command line
* Edit config.js with your RSN/Twitch
* Create account.js file (see below)
* Run "node bot.js" from the command line

Twitch bots require Twitch accounts. Go to Twitch, make an account, and get the oauth key. Then create this file account.js in the same directory as the other files. It should look like this (but with your own info):
```javascript
var account = {
  username: "TwitchBotAccount",
  password: "oauth:4k3ij32lk23oij4lk52oij32"
}
module.exports = account
```

#Features
|Commands|Example|Description|
|--------|-------|-----------|
|!commands|!commands|shows available commands|
|!joke|!joke|tells a random one-liner joke|
|!skill name|!skill smith|looks up the Runescape stats for the username (config.js) and says the skill info|
|!ge name/id|!ge raw rocktail|looks up the Runescape ge price of the item|
