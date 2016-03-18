'use strict';

let irc = require('tmi.js')
let rsapi = require('runescape-api')
let _ = require('lodash')
let Promise = require('bluebird')
let Humanize = require('humanize-plus')
let jokes = require('./jokes.js')
let ge = require('./ge.js')
let config = require('./config.js').config
let options = require('./config.js').options

let skillList = {
  overall: ['overall', 'oa'],
  attack: ['attack', 'att'],
  defence: ['defence', 'defense', 'def'],
  strength: ['strength', 'str'],
  hitpoints: ['constitution', 'hp', 'hitpoints'],
  ranged: ['ranged', 'range'],
  prayer: ['prayer', 'pray'],
  magic: ['magic', 'mage'],
  cooking: ['cooking', 'coking', 'cook', 'cok'],
  woodcutting: ['woodcutting', 'wc', 'woodchop'],
  fletching: ['fletching', 'fletch'],
  fishing: ['fishing', 'fish'],
  firemaking: ['firemaking', 'fm'],
  crafting: ['crafting', 'craft'],
  smithing: ['smithing', 'smith', 'best'],
  mining: ['mining', 'mine'],
  herblore: ['herblore', 'herb', 'herby'],
  agility: ['agility', 'agil'],
  thieving: ['thieving', 'thiev', 'thief', 'thiefing', 'theiving', 'theiv', 'theif', 'theifing'],
  slayer: ['slayer', 'slay'],
  farming: ['farming', 'farm'],
  runecrafting: ['runecrafting', 'rc'],
  hunter: ['hunter', 'hunt', 'hunting'],
  construction: ['construction', 'const', 'constr', 'construct'],
  summoning: ['summoning', 'summon', 'sum', 'summ'],
  dungeoneering: ['dungeoneering', 'dungeon', 'dung', 'dg', 'loldg'],
  divination: ['divination', 'div', 'divi', 'divine']
}

function randomJoke(){
  return jokes[Math.floor(Math.random() * jokes.length-1)]
}

function findAlias(string){
  let result = ""
  _.keys(skillList).map( (key) => {
    if(skillList[key].indexOf(string) != -1){
      result = key
    }
  })
  return result
}

function simplifyString(string){
  string = string.replace(/[\(\)\.\-]/g, "")
  string = string.replace(/&/g, "and")
  return string
}

let client = new irc.client(options);

client.on('chat', function(channel, user, message, self){
  message = message.toLowerCase()
  switch(true){
    case /!skill [a-z]*/.test(message):
      let skillName = findAlias(message.split(" ")[1])
      //check against list of skill names
      rsapi.rs.hiscores.player(config.username).then( (apiStats) => {
        let skillObject = apiStats.skills[skillName]
        let resultString = config.username + "'s " + _.capitalize(skillName) + " ---- " +
                           "Level: " + skillObject.level + " ░ " +
                           "Exp: "   + Humanize.intComma(skillObject.exp)   + " ░ " +
                           "Rank: "  + Humanize.intComma(skillObject.rank)
        Promise.resolve(resultString).then( (res) => {
          client.say(channel, resultString)
        })
      })
      break;
    case /!ge ([0-9]* | [a-z\ ]*)*/.test(message):
      let thing = message.split(" ").slice(1).join("")
      let parsedInt = parseInt(thing, 10)
      if(Number.isInteger(parsedInt)){
        thing = parsedInt
      } else {
        thing = ge[simplifyString(thing)]
      }
      rsapi.rs.ge.itemInformation(thing).then( (result) => {
        let resultString = result.item.name + " ---- " + result.item.current.price + " gp [" + result.item.today.price.split(" ").join("") + " gp]"
        Promise.resolve(resultString).then( (res) => {
          client.say(channel, resultString)
        })
      })
      break;
    case /!joke/.test(message):
      client.say(channel, randomJoke())
      break;
    case /!help/.test(message):
      client.say(channel, "You're now breathing manually.   You're now blinking manually.   You're now aware of your tongue.")
      break;
    case /!commands/.test(message):
      client.say(channel, "Supported commands: !joke, !help, !skill <name>, !ge <name> or <id> (work in progress)")
      break;
    case /!who/.test(message):
      client.say(channel, "I'm watching stats for: "+config.username)
      break;
  }
})

client.connect();
