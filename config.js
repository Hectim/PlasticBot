var account = require('./account.js')

var config = {
  username: "200m Smith", // Runescape
  channels: ["#hectirn"]  // Twitch
}

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "chat",
    reconnect: true
  },
  identity: {
    username: account.botUsername,
    password: account.botPassword
  },
  channels: config.channels
};


module.exports.config = config
module.exports.options = options
